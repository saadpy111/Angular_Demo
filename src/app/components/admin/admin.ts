import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../Models/IProduct';
import { CategoryInfo, CategoryService } from '../../Services/category-service';
import { ProductInput, ProductService } from '../../Services/product-service';

function createEmptyProduct(): ProductInput {
  return {
    title: '',
    description: '',
    image: '',
    category: '',
    categoryId: 1,
    price: 0,
    quantity: 0,
  };
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly products = signal<IProduct[]>([]);
  protected readonly categories = signal<CategoryInfo[]>([]);
  protected readonly loading = signal(true);
  protected readonly productsLoadError = signal(false);
  protected readonly saving = signal(false);
  protected readonly deleting = signal(false);
  protected readonly categoriesError = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');
  protected readonly editorOpen = signal(false);
  protected readonly productToDelete = signal<IProduct | null>(null);
  protected editingProductId: number | null = null;
  protected draft = createEmptyProduct();

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  protected openNewProduct(): void {
    this.editingProductId = null;
    this.draft = createEmptyProduct();
    const defaultCategory = this.categories()[0];
    if (defaultCategory) {
      this.draft = { ...this.draft, category: defaultCategory.name, categoryId: defaultCategory.id };
    }
    this.errorMessage.set('');
    this.editorOpen.set(true);
  }

  protected updateCategory(categoryName: string): void {
    const category = this.categories().find((item) => item.name === categoryName);
    if (category) {
      this.draft = { ...this.draft, category: category.name, categoryId: category.id };
    }
  }

  protected editProduct(product: IProduct): void {
    this.editingProductId = product.id;
    this.draft = {
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      categoryId: product.categoryId,
      price: product.price,
      quantity: product.quantity,
    };
    this.errorMessage.set('');
    this.editorOpen.set(true);
  }

  protected closeEditor(): void {
    if (this.saving()) return;
    this.editorOpen.set(false);
  }

  protected saveProduct(): void {
    if (this.saving() || this.categoriesError()) return;

    const editingId = this.editingProductId;
    const product: ProductInput = {
      ...this.draft,
      title: this.draft.title.trim(),
      description: this.draft.description.trim(),
      image: this.draft.image.trim(),
      category: this.draft.category.trim(),
      categoryId: Number(this.draft.categoryId),
      price: Number(this.draft.price),
      quantity: Number(this.draft.quantity),
    };

    this.errorMessage.set('');
    this.successMessage.set('');
    this.saving.set(true);

    const request$ = editingId === null
      ? this.productService.addProduct(product)
      : this.productService.updateProduct(editingId, product);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (savedProduct) => {
        this.products.update((products) => editingId === null
          ? [...products, savedProduct]
          : products.map((existing) => existing.id === savedProduct.id ? savedProduct : existing));
        this.successMessage.set(editingId === null ? 'Product added to your catalog.' : 'Product changes saved.');
        this.saving.set(false);
        this.editorOpen.set(false);
      },
      error: () => {
        this.errorMessage.set('The product could not be saved. Please try again.');
        this.saving.set(false);
      },
    });
  }

  protected confirmDelete(product: IProduct): void {
    this.productToDelete.set(product);
  }

  protected cancelDelete(): void {
    this.productToDelete.set(null);
  }

  protected deleteProduct(): void {
    const product = this.productToDelete();
    if (!product || this.deleting()) return;

    this.errorMessage.set('');
    this.successMessage.set('');
    this.deleting.set(true);
    this.productService.deleteProduct(product.id).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        this.products.update((products) => products.filter((item) => item.id !== product.id));
        this.productToDelete.set(null);
        this.successMessage.set(`${product.title} was removed from your catalog.`);
        this.deleting.set(false);
      },
      error: () => {
        this.errorMessage.set('The product could not be deleted. Please try again.');
        this.productToDelete.set(null);
        this.deleting.set(false);
      },
    });
  }

  private loadCategories(): void {
    this.categoryService.GetCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (categories) => this.categories.set(categories),
      error: () => this.categoriesError.set(true),
    });
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.productsLoadError.set(false);
    this.errorMessage.set('');
    this.productService.GetProducts().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Products could not be loaded. Please refresh to try again.');
        this.productsLoadError.set(true);
        this.loading.set(false);
      },
    });
  }
}
