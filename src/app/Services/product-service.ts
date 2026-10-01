import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../Models/IProduct';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);


  GetProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/products`).pipe(
      map((products) => products.map((product) => this.normalizeProduct(product))),
    );
  }

  GetProductById(id: number): Observable<IProduct | null> {
    return this.http.get<IProduct>(`${environment.apiUrl}/products/${id}`).pipe(
      map((product) => this.normalizeProduct(product)),
      catchError((error: unknown) => {
        if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      }),
    );
  }

  GetProductsByCategory(categoryId: number): Observable<IProduct[]> {
    if (categoryId === 0) return this.GetProducts();
    const params = new HttpParams().set('categoryId', categoryId);
    return this.http.get<IProduct[]>(`${environment.apiUrl}/products`, { params }).pipe(
      map((products) => products.map((product) => this.normalizeProduct(product))),
    );
  }

  GetProductsBySearchTerm(
    searchTerm: string,
    products$: Observable<IProduct[]> = this.GetProducts(),
  ): Observable<IProduct[]> {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return products$;
    return products$.pipe(map((products) => products.filter((product) =>
      `${product.title} ${product.description}`.toLowerCase().includes(normalizedSearch),
    )));
  }

  GetTheNextProductID(currentProductId: number): Observable<number | null> {
    return this.GetProducts().pipe(map((products) => {
      const currentIndex = products.findIndex((product) => product.id === currentProductId);
      return currentIndex >= 0 && currentIndex < products.length - 1
        ? products[currentIndex + 1].id
        : null;
    }));
  }

  GetThePreviousProductID(currentProductId: number): Observable<number | null> {
    return this.GetProducts().pipe(map((products) => {
      const currentIndex = products.findIndex((product) => product.id === currentProductId);
      return currentIndex > 0 ? products[currentIndex - 1].id : null;
    }));
  }

  GetProductsBySortOption(
    sortOption: string,
    products$: Observable<IProduct[]> = this.GetProducts(),
  ): Observable<IProduct[]> {
    return products$.pipe(map((products) => {
      switch (sortOption) {
        case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
        case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
        case 'title-asc': return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc': return [...products].sort((a, b) => b.title.localeCompare(a.title));
        default: return products;
      }
    }));
  }

  private normalizeProduct(product: IProduct): IProduct {
    return {
      ...product,
      id: Number(product.id),
      categoryId: Number(product.categoryId),
      price: Number(product.price),
      quantity: Number(product.quantity),
    };
  }
}
