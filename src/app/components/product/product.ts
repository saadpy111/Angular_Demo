import { Component, DestroyRef, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { IProduct } from '../../Models/IProduct';
import { RouterLink } from '@angular/router';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../Services/product-service';

@Component({
  imports: [RouterLink],
  selector: 'app-product',
  styleUrl: './product.css',
  templateUrl: './product.html',
})
export class Product
{
  private readonly destroyRef = inject(DestroyRef);
  protected readonly filteredProducts = signal<IProduct[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly currentDate = new Date();
  protected readonly cartCount = signal(0);
  protected  totalPrice : number = 0;
  readonly searchTerm = input('');
  protected readonly sortOption = signal('featured');
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 4;
  readonly selectedCategoryId = input(0);
  @Output() totalPriceChange = new EventEmitter<number>();

  constructor(private readonly productService: ProductService) {
    combineLatest([
      toObservable(this.searchTerm),
      toObservable(this.selectedCategoryId),
      toObservable(this.sortOption),
    ]).pipe(
      switchMap(([searchTerm, categoryId, sortOption]) => {
        this.loading.set(true);
        this.loadError.set(false);
        const categoryProducts$ = this.productService.GetProductsByCategory(categoryId);
        const searchedProducts$ = this.productService.GetProductsBySearchTerm(searchTerm, categoryProducts$);
        return this.productService.GetProductsBySortOption(sortOption, searchedProducts$).pipe(
          catchError(() => {
            this.loadError.set(true);
            this.loading.set(false);
            return of<IProduct[]>([]);
          }),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((products) => {
      this.filteredProducts.set(products);
      this.loading.set(false);
    });
  }

  addToCart(product: IProduct): void {
    this.cartCount.update((count) => count + 1);
    this.totalPrice = this.totalPrice + product.price;
    this.totalPriceChange.emit(this.totalPrice);
  }

}
