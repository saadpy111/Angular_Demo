import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
     constructor(
       private _productService: ProductService,
       private route: ActivatedRoute,
       private router: Router
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
