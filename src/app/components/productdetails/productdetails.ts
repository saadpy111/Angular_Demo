import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { IProduct } from '../../Models/IProduct';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../Services/product-service';
@Component({
  imports: [RouterLink],
  selector: 'app-productdetails',
  styleUrl: './productdetails.css',
  templateUrl: './productdetails.html',
})
export class Productdetails implements OnInit
 {
  protected readonly currentProductId = signal<number | null>(null);
  protected readonly product = signal<IProduct | null>(null);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);

  constructor(
    private readonly _productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _Location: Location,
    private readonly destroyRef: DestroyRef,
  ) {
  }

goToNext() {
  const currentProductId = this.currentProductId();
  if (currentProductId === null) return;
  this._productService.GetTheNextProductID(currentProductId).pipe(
    takeUntilDestroyed(this.destroyRef),
  ).subscribe((nextProductId) => {
    if (nextProductId !== null) this.router.navigate(['/products', nextProductId]);
  });
}
goToPrevious() {
  const currentProductId = this.currentProductId();
  if (currentProductId === null) return;
  this._productService.GetThePreviousProductID(currentProductId).pipe(
    takeUntilDestroyed(this.destroyRef),
  ).subscribe((previousProductId) => {
    if (previousProductId !== null) this.router.navigate(['/products', previousProductId]);
  });
}
goBack(): void {
  this._Location.back();
}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((productId) => {
        this.loading.set(true);
        this.loadError.set(false);
        if (!Number.isInteger(productId) || productId <= 0) return of(null);
        return this._productService.GetProductById(productId);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (product) => {
        this.product.set(product);
        this.currentProductId.set(product?.id ?? null);
        this.loading.set(false);
        if (!product) this.router.navigate(['/errorpage']);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  protected readonly addedToBag = signal(false);

  protected addToBag(): void {
    this.addedToBag.set(true);
  }

 }
