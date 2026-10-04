import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInput } from '../../../Services/product-service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-add-product-modal',
  styleUrl: './add-product-modal.css',
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {

  close = output<void>();

  productAdded = output<ProductInput>();


  product: ProductInput = {
    image: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    categoryId: 0,
    quantity: 0
  };


  submit(): void {

    this.productAdded.emit(this.product);

  }

}