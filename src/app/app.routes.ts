import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Product } from './components/product/product';
import { Errorpage } from './components/errorpage/errorpage';
import { Productdetails } from './components/productdetails/productdetails';

export const routes: Routes 
=
 [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'products', component : Product},
    {path: 'products/:id', component : Productdetails},
    {path: 'errorpage', component : Errorpage},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
    
 ];
