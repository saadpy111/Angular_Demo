import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth-guard';

export const routes: Routes 
=
 [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent : () => import('./components/home/home').then(m => m.Home)},
    {path: 'EditProduct', loadComponent : () => import('./components/edit-product-modal/edit-product-modal/edit-product-modal').then(m => m.EditProductModal)},
    {path: 'products', loadComponent : () => import('./components/product/product').then(m => m.Product), canActivate : [authGuard]},
    {path: 'products/:id', loadComponent : () => import('./components/productdetails/productdetails').then(m => m.Productdetails), canActivate : [authGuard]},
    {path: 'admin',  loadComponent : () => import('./components/admin/admin').then(m => m.Admin)},
    {path: 'errorpage', loadComponent : () => import('./components/errorpage/errorpage').then(m => m.Errorpage)},
    {path: 'auth',  loadComponent : () => import('./components/auth-component/auth-component').then(m => m.AuthComponent)},
    {path: 'dashboard', loadComponent : () => import('./components/dashboard/dashboard-component/dashboard-component').then(m => m.DashboardComponent)},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
    
 ];
