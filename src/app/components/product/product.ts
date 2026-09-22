import { Component, computed, EventEmitter, Input, OnChanges, Output, output, signal, SimpleChanges } from '@angular/core';

interface Product_info {
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  categoryId: number;
  quantity: number;
}

@Component({
  imports: [],
  selector: 'app-product',
  styleUrl: './product.css',
  templateUrl: './product.html',
})
export class Product implements OnChanges
{

    protected readonly products: Product_info[] = [
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
      title: 'Air Runner One',
      description: 'A lightweight everyday sneaker with responsive comfort.',
      category: 'Footwear',
      price: 99.99,
      categoryId: 1,
      quantity: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
      title: 'Field Watch',
      description: 'A clean, durable timepiece made for daily adventures.',
      category: 'Accessories',
      price: 149.99,
      categoryId: 2,
      quantity: 1
    },  
    {
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
      title: 'Morning Roast',
      description: 'A bright, balanced coffee blend for slow starts.',
      category: 'Pantry',
      price: 14.99,
      categoryId: 3,
      quantity: 1 
    },
    {
      image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
      title: 'Cedar No. 4',
      description: 'Warm cedar and soft amber in a considered fragrance.',
      category: 'Wellness',
      price: 29.99,
      categoryId: 4,
      quantity: 4
    },
    {
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
      title: 'Studio Chair',
      description: 'A sculpted seat that brings calm focus to your workspace.',
      category: 'Home',
      price: 199.99,
      categoryId: 5,
      quantity: 11
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
      title: 'Sound Arc',
      description: 'Immersive wireless audio with a soft-touch finish.',
      category: 'Tech',
      price: 199.99,
      categoryId: 6,
      quantity: 8
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
      title: 'Day Pack',
      description: 'A streamlined carryall with room for the essentials.',
      category: 'Travel',
      price: 49.99,
      categoryId: 7,
      quantity: 2
    },  
    {
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85',
      title: 'Sun Frame',
      description: 'A bold, lightweight frame built for bright days.',
      category: 'Accessories',
      price: 39.99,
      categoryId: 2,
      quantity: 3
    },
    {
      image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=900&q=85',
      title: 'Cloud Cream',
      description: 'A rich daily moisturizer with a fresh botanical finish.',
      category: 'Wellness',
      price: 24.99,
      categoryId: 4,
      quantity: 3
    },
    {
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
      title: 'Shape Vase',
      description: 'A tactile ceramic accent for flowers or quiet corners.',
      category: 'Home',
      price: 79.99,
      categoryId: 5,
      quantity: 2
    },
  ];
  protected  filteredProducts : Product_info[] = this.products;
  protected readonly currentDate = new Date();
  protected readonly cartCount = signal(0);
  protected  totalPrice : number = 0;
  @Input() searchTerm: string = '';
  protected readonly sortOption = signal('featured');
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 4;
  @Input() selectedCategoryId: number = 0;
  @Output() totalPriceChange = new EventEmitter<number>();

  ngOnChanges(){
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategoryId === 0 || product.categoryId === this.selectedCategoryId;
      const matchesSearch = !this.searchTerm || `${product.title} ${product.description}`.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
   
 addToCart(product: Product_info): void {
    this.cartCount.update((count) => count + 1);
    this.totalPrice = this.totalPrice + product.price;
    this.totalPriceChange.emit(this.totalPrice);
  }

  //   protected readonly filteredProducts = computed(() => {
  //   const search = this.searchTerm().trim().toLowerCase();
  //   const categoryId = this.selectedCategoryId();
  //   const sortedProducts = this.products.filter((product) => {
  //     const matchesSearch = !search || `${product.title} ${product.description}`.toLowerCase().includes(search);
  //     const matchesCategory = categoryId === null || product.categoryId === categoryId;
  //     return matchesSearch && matchesCategory;
  //   });

  //   return [...sortedProducts].sort((firstProduct, secondProduct) => {
  //     if (this.sortOption() === 'price-low') return firstProduct.price - secondProduct.price;
  //     if (this.sortOption() === 'price-high') return secondProduct.price - firstProduct.price;
  //     return this.products.indexOf(firstProduct) - this.products.indexOf(secondProduct);
  //   });
  // });

  // protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize)));
  // protected readonly paginatedProducts = computed(() => {
  //   const start = (this.currentPage() - 1) * this.pageSize;
  //   return this.filteredProducts().slice(start, start + this.pageSize);
  // });
  // protected readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  // protected updateSearch(searchTerm: string): void {
  //   this.searchTerm.set(searchTerm);
  //   this.currentPage.set(1);
  // }

  // protected updateCategory(categoryId: number | null): void {
  //   this.selectedCategoryId.set(categoryId);
  //   this.currentPage.set(1);
  // }

  // protected updateSort(sortOption: string): void {
  //   this.sortOption.set(sortOption);
  //   this.currentPage.set(1);
  // }

  // protected goToPage(page: number): void {
  //   this.currentPage.set(page);
  // }

  // protected addToCart(product: Product_info): void {
  //   this.cartCount.update((count) => count + 1);
  //   this.totalPrice.update((total) => total + product.price);
  //}
}
