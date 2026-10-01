import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CategoryInfo, CategoryService } from '../../Services/category-service';
import { NotificationService } from '../../Services/notification-service';
import { PowPipe } from '../../Pipes/pow-pipe';
import { Product } from '../product/product';

@Component({
  imports: [FormsModule, CommonModule, PowPipe, Product],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly currentDate = new Date();
  protected readonly cartCount = signal(0);
  protected totalPrice = 0;
  protected readonly searchTerm = signal('');
  protected readonly selectedCategoryId = signal(0);
  protected readonly sortOption = signal('featured');
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 4;
  private readonly categoryData = signal<CategoryInfo[]>([]);
  protected readonly categoriesLoading = signal(true);
  protected readonly categoriesError = signal(false);
  protected readonly categories = computed(() => [
    { id: 0, name: 'All categories' },
    ...this.categoryData(),
  ]);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly categoryService: CategoryService,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.categoryService.GetCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (categories) => {
        this.categoryData.set(categories);
        this.categoriesLoading.set(false);
      },
      error: () => {
        this.categoriesError.set(true);
        this.categoriesLoading.set(false);
      },
    });

    this.notificationService.getnoteifications().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (notification) => console.log('Notification:', notification),
      error: (error) => console.error('Error:', error),
      complete: () => console.log('All notifications received.'),
    });
  }

  changetotalprice(event: number): void {
    this.totalPrice = event;
  }

  updateCategory(categoryId: string | number): void {
    this.selectedCategoryId.set(Number(categoryId));
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategoryId.set(0);
  }
}
