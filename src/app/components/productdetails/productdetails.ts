import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
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
  selector: 'app-productdetails',
  styleUrl: './productdetails.css',
  templateUrl: './productdetails.html',
})
export class Productdetails implements OnInit
 {
  currentProductId: number | null = null;
goToNext() {
  const nextProductId = this._productService.GetTheNextProductID(this.currentProductId!);
  if (nextProductId !== null) {
    this.router.navigate(['/products', nextProductId]);
  }
}
goToPrevious() {
  const previousProductId = this._productService.GetThePreviousProductID(this.currentProductId!);
  if (previousProductId !== null) {
    this.router.navigate(['/products', previousProductId]);
  }
}
goBack() {
this._Location.back();
}
     constructor(
       private _productService: ProductService,
       private route: ActivatedRoute,
       private router: Router,
       private _Location: Location
     )
     {
     }
    ngOnInit(){
    this.route.params.subscribe(params => {
      const productId = +params['id'];
     const temp =  this._productService.GetProductById(productId);
     if(temp)
     {
      this.product = temp as Product_info;
      this.currentProductId = temp.id;
     }else
     {
      this.router.navigate(['/errorpage']);
     }
    });

  }

     protected  product :Product_info | null = null;
     protected readonly addedToBag = signal(false);

     protected addToBag(): void {
       this.addedToBag.set(true);
     }

 }
