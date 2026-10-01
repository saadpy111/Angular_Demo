import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CategoryInfo {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);

  GetCategories(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(`${environment.apiUrl}/categories`).pipe(
      map((categories) => categories.map((category) => ({ ...category, id: Number(category.id) }))),
    );
  }

  GetCategoryById(id: number): Observable<CategoryInfo | null> {
    return this.http.get<CategoryInfo>(`${environment.apiUrl}/categories/${id}`).pipe(
      map((category) => ({ ...category, id: Number(category.id) })),
      catchError((error: unknown) => {
        if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      }),
    );
  }
}