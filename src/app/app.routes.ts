import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Errorpage } from './components/errorpage/errorpage';
import { Productdetails } from './components/productdetails/productdetails';
import { AuthComponent } from './components/auth-component/auth-component';
import { authGuard } from './Guards/auth-guard';
import { Home } from './components/home/home';

export const routes: Routes 
=
 [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'products', component : Product , canActivate : [authGuard]},
    {path: 'products/:id', component : Productdetails},
    {path: 'errorpage', component : Errorpage},
    {path: 'auth', component : AuthComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
    
 ];
