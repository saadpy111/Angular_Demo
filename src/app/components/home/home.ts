import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  categoryId: number; 
}
interface Category {
  id: number;
  name: string;
  
}

@Component({
  imports: [FormsModule,CommonModule ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly cartCount = signal(0);
     protected totalPrice = signal(0);
     protected readonly selectedCategoryId = signal<number | null>(null);
     protected readonly categories: Category[] = [
       { id: 1, name: 'Footwear' },
       { id: 2, name: 'Accessories' },
       { id: 3, name: 'Pantry' },
       { id: 4, name: 'Wellness' },
       { id: 5, name: 'Home' },
       { id: 6, name: 'Tech' },
       { id: 7, name: 'Travel' }
     ];
     protected readonly products: Product[] = [
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
      title: 'Air Runner One',
      description: 'A lightweight everyday sneaker with responsive comfort.',
      category: 'Footwear',
      price: 99.99,
      categoryId: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
      title: 'Field Watch',
      description: 'A clean, durable timepiece made for daily adventures.',
      category: 'Accessories',
      price: 149.99,
      categoryId: 2
    },  
    {
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
      title: 'Morning Roast',
      description: 'A bright, balanced coffee blend for slow starts.',
      category: 'Pantry',
      price: 14.99,
      categoryId: 3
    },
    {
      image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
      title: 'Cedar No. 4',
      description: 'Warm cedar and soft amber in a considered fragrance.',
      category: 'Wellness',
      price: 29.99,
      categoryId: 4
    },
    {
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
      title: 'Studio Chair',
      description: 'A sculpted seat that brings calm focus to your workspace.',
      category: 'Home',
      price: 199.99,
      categoryId: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
      title: 'Sound Arc',
      description: 'Immersive wireless audio with a soft-touch finish.',
      category: 'Tech',
      price: 199.99,
      categoryId: 6
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
      title: 'Day Pack',
      description: 'A streamlined carryall with room for the essentials.',
      category: 'Travel',
      price: 49.99,
      categoryId: 7
    },
    {
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
      title: 'Sun Frame',
      description: 'A bold, lightweight frame built for bright days.',
      category: 'Accessories',
      price: 39.99,
      categoryId: 2
    },
    {
      image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=900&q=85',
      title: 'Cloud Cream',
      description: 'A rich daily moisturizer with a fresh botanical finish.',
      category: 'Wellness',
      price: 24.99,
      categoryId: 4
    },
    {
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      title: 'Shape Vase',
      description: 'A tactile ceramic accent for flowers or quiet corners.',
      category: 'Home',
      price: 79.99,
      categoryId: 5
    },
  ];


     updateCategory(categoryId: string): void {
        this.selectedCategoryId.set(Number(categoryId));
     }
  protected addToCartAndCalculate(quantity: string, price: number): void {
    const qty = parseInt(quantity, 10) || 1;
    this.cartCount.update((count) => count + qty);
    this.totalPrice.update((total) => total + price * qty);
  }
}
