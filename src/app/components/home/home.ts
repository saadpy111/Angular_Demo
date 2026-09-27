import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PowPipe } from '../../Pipes/pow-pipe';
import { Product } from '../product/product';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from '../../Services/notification-service';


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
export class Home  implements OnInit  , OnDestroy {
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


 subscription!:Subscription ;
constructor(private _notificationService:NotificationService)
{
   

}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this._notificationService.getnoteifications().subscribe({
  next: (notification) => {
    console.log('Notification:', notification);
  },
  error: (error) => {
    console.error('Error:', error);
  },
  complete: () => {
    console.log('All notifications received.');
  }
});

  }






changetotalprice(event: number) {
  this.totalPrice = event;
}

clearFilters(): void {
  this.searchTerm = '';
  this.selectedCategoryId = 0;
}
}