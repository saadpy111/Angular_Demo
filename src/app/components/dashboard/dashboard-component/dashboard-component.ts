import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../Models/IProduct';
import { ProductInput, ProductService } from '../../../Services/product-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddProductModal } from '../../add-product-modal/add-product-modal/add-product-modal';
import { EditProductModal } from '../../edit-product-modal/edit-product-modal/edit-product-modal';

@Component({
  imports: [CommonModule, FormsModule, AddProductModal , EditProductModal],
  selector: 'app-dashboard-component',
  styleUrl: './dashboard-component.css',
  templateUrl: './dashboard-component.html',
})
export class DashboardComponent implements OnInit
{
  private readonly destroyRef = inject(DestroyRef);
     protected showAddProductModal = signal(false);
     protected showEditProductModal = signal(false);
     protected CurrentProductId = signal<string | null>(null);
     
     products = signal<IProduct[]>([]);
     protected editProduct: IProduct = {
        id:'',
        image: '',
        title: '',
        description: '',
        category: '',
        price: 0,
        categoryId: 0,
        quantity: 0
      };
    productService = inject(ProductService);
    ngOnInit(): void {
        this.productService.GetProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next : (data) => {
            this.products.set(data);
          } ,
          error : (err) => {
            console.log(err);
          }
        });
    }
       protected openAddProductModal(): void {
         this.showAddProductModal.set(true);
  }

closeEditProductModal() {
    this.showEditProductModal.set(false);
  }
  protected closeAddProductModal(): void {
     this.showAddProductModal.set(false);
  }
  
 protected openEditProductModal(productId: string): void {
   this.CurrentProductId.set(productId);
   this.productService.GetProductById(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
     next: (data) => {
       if (data) {
         this.editProduct = data;
         this.showEditProductModal.set(true);
        }
      }
    });
  }
updateProduct(updatedProduct: IProduct): void {
    this.productService.updateProduct(this.CurrentProductId()!, updatedProduct).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.products.update((currentProducts) => currentProducts.map((p) => p.id === data.id ? data : p));
        this.showEditProductModal.set(false);
        this.CurrentProductId.set(null);
      }
    });
  }
protected addProduct(product: ProductInput): void {

  this.productService.addProduct(product)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({

      next: (createdProduct) => {

        this.products.update(products => [
          ...products,
          createdProduct
        ]);

        this.showAddProductModal.set(false);
      },

      error: (err) => {
        console.log(err);
      }

    });
}
     deleteProduct(productId: string): void 
     {
         this.productService.deleteProduct(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next : (data) => {
              this.products.update((currentProducts) => currentProducts.filter((p) => p.id !== data.id));
            },
            error : (err) => {
              console.log(err);
            }
         });
     }


}
