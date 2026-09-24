import { Component, computed, EventEmitter, Input, OnChanges, Output, output, signal, SimpleChanges } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { RouterLink } from '@angular/router';

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
@Component({
  imports: [RouterLink],
  selector: 'app-product',
  styleUrl: './product.css',
  templateUrl: './product.html',
})
export class Product implements OnChanges
{
  constructor(private _productService: ProductService) 
  {
      this.filteredProducts  = _productService.GetProducts();
      this.products = _productService.GetProducts();
  }
  protected readonly products :Product_info[] ;
  protected  filteredProducts : Product_info[];
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
      const matchesCategory = this._productService.GetProductsByCategory(this.selectedCategoryId).some(p => p.id === product.id) ;
      const matchesSearch = this._productService.GetProductsBySearchTerm(this.searchTerm).some(p => p.id === product.id);
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
