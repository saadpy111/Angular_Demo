import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductInput } from '../../../Services/product-service';

@Component({
  imports: [ CommonModule, FormsModule , ReactiveFormsModule ],
  selector: 'app-add-product-modal',
  styleUrl: './add-product-modal.css',
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {

  close = output<void>();

  productAdded = output<ProductInput>();

   addProductGroup = new FormGroup
   ({
        title: new FormControl('',[Validators.required , Validators.minLength(3)]),
        description: new FormControl(''),
        category: new FormControl(''),
        price: new FormControl(0),
        categoryId: new FormControl(0),
        quantity: new FormControl(0),
        image: new FormControl(''),
   });
  



  product: ProductInput = {
    image: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    categoryId: 0,
    quantity: 0
  };
// submit2(): void {

//   console.log('Form submitted with product:', this.product);
// }

  submit(): void {
  this.product.categoryId = Number(this.addProductGroup.value.categoryId);
  this.product.price = Number(this.addProductGroup.value.price);
  this.product.quantity = Number(this.addProductGroup.value.quantity);
  this.product.title = this.addProductGroup.value.title || '';
  this.product.description = this.addProductGroup.value.description || '';
  this.product.image = this.addProductGroup.value.image || '';

    this.productAdded.emit(this.product);

  }

}