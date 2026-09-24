import { Service } from '@angular/core';
import { Product } from '../components/product/product';
interface Product_info {
    id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  categoryId: number;
  quantity: number;
}
@Service()
export class ProductService
 
{


    protected readonly products: Product_info[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
      title: 'Air Runner One',
      description: 'A lightweight everyday sneaker with responsive comfort.',
      category: 'Footwear',
      price: 99.99,
      categoryId: 1,
      quantity: 1
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
      title: 'Field Watch',
      description: 'A clean, durable timepiece made for daily adventures.',
      category: 'Accessories',
      price: 149.99,
      categoryId: 2,
      quantity: 1
    },  
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
      title: 'Morning Roast',
      description: 'A bright, balanced coffee blend for slow starts.',
      category: 'Pantry',
      price: 14.99,
      categoryId: 3,
      quantity: 1 
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
      title: 'Cedar No. 4',
      description: 'Warm cedar and soft amber in a considered fragrance.',
      category: 'Wellness',
      price: 29.99,
      categoryId: 4,
      quantity: 4
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
      title: 'Studio Chair',
      description: 'A sculpted seat that brings calm focus to your workspace.',
      category: 'Home',
      price: 199.99,
      categoryId: 5,
      quantity: 11
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
      title: 'Sound Arc',
      description: 'Immersive wireless audio with a soft-touch finish.',
      category: 'Tech',
      price: 199.99,
      categoryId: 6,
      quantity: 8
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
      title: 'Day Pack',
      description: 'A streamlined carryall with room for the essentials.',
      category: 'Travel',
      price: 49.99,
      categoryId: 7,
      quantity: 2
    },  
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
      title: 'Sun Frame',
      description: 'A bold, lightweight frame built for bright days.',
      category: 'Accessories',
      price: 39.99,
      categoryId: 2,
      quantity: 3
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=900&q=85',
      title: 'Cloud Cream',
      description: 'A rich daily moisturizer with a fresh botanical finish.',
      category: 'Wellness',
      price: 24.99,
      categoryId: 4,
      quantity: 3
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      title: 'Shape Vase',
      description: 'A tactile ceramic accent for flowers or quiet corners.',
      category: 'Home',
      price: 79.99,
      categoryId: 5,
      quantity: 2
    },
  ];

  GetProducts(): Product_info[] {
    return this.products;
  }
  GetProductById(id: number): Product_info | undefined {
    return this.products.find(product => product.id === id);
  }
 GetProductsByCategory(categoryId: number): Product_info[] {
    if (categoryId === 0) {
      return this.products;
    }
    return this.products.filter(product => product.categoryId === categoryId);
  }
  GetProductsBySearchTerm(searchTerm: string): Product_info[] {
    if (!searchTerm) {
      return this.products;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  GetProductsBySortOption(sortOption: string): Product_info[] {
    switch (sortOption) {
      case 'price-asc':
        return [...this.products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...this.products].sort((a, b) => b.price - a.price);
      case 'title-asc':
        return [...this.products].sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return [...this.products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return this.products;
    }
  }
}
