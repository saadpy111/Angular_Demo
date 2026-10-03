import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Errorpage } from './components/errorpage/errorpage';
import { Productdetails } from './components/productdetails/productdetails';
import { AuthComponent } from './components/auth-component/auth-component';
import { authGuard } from './Guards/auth-guard';
import { Home } from './components/home/home';
import { Admin } from './components/admin/admin';

export const routes: Routes 
=
 [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent : () => import('./components/home/home').then(m => m.Home)},
    {path: 'products', loadComponent : () => import('./components/product/product').then(m => m.Product), canActivate : [authGuard]},
    {path: 'products/:id', loadComponent : () => import('./components/productdetails/productdetails').then(m => m.Productdetails), canActivate : [authGuard]},
    {path: 'admin',  loadComponent : () => import('./components/admin/admin').then(m => m.Admin)},
    {path: 'errorpage', loadComponent : () => import('./components/errorpage/errorpage').then(m => m.Errorpage)},
    {path: 'auth',  loadComponent : () => import('./components/auth-component/auth-component').then(m => m.AuthComponent)},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
    
 ];
