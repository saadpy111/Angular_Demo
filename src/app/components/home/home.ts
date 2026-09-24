import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PowPipe } from '../../Pipes/pow-pipe';
import { Product } from '../product/product';


interface Category {
  id: number | null;
  name: string;
}

@Component({
  imports: [FormsModule, CommonModule, PowPipe, Product],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly currentDate = new Date();
  protected readonly cartCount = signal(0);
  protected  totalPrice :number = 0;
  protected searchTerm = '';
  protected selectedCategoryId = 0;
  protected readonly sortOption = signal('featured');
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 4;
  protected readonly categories: Category[] = [
    { id: 0, name: 'All categories' },
    { id: 1, name: 'Footwear' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Pantry' },
    { id: 4, name: 'Wellness' },
    { id: 5, name: 'Home' },
    { id: 6, name: 'Tech' },
    { id: 7, name: 'Travel' },
  ];

changetotalprice(event: number) {
  this.totalPrice = event;
}

clearFilters(): void {
  this.searchTerm = '';
  this.selectedCategoryId = 0;
}
}