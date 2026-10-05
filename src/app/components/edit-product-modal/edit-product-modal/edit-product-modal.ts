import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../Models/IProduct';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-edit-product-modal',
  styleUrl: './edit-product-modal.css',
  templateUrl: './edit-product-modal.html',
})
export class EditProductModal implements OnInit
{
      ngOnInit(): void { 
         console.log('EditProductModal initialized with product:', this.inputProduct());
         this.product = { ...this.inputProduct() }; // Create a copy of the input product to avoid direct mutation
      }
      product = {
        id:'',
        image: '',
        title: '',
        description: '',
        category: '',
        price: 0,
        categoryId: 0,
        quantity: 0
      };
      close = output<void>();
      inputProduct = input.required<IProduct>();   
      productUpdated = output<IProduct>();
      closeModal() {  
        this.close.emit();
      }

      updateProduct() {
        this.productUpdated.emit(this.product);
      }

}
