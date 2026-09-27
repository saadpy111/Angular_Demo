import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _isLoggedIn = signal(
 this.isUserLoggedin()
  );

 readonly isloggedIn = this._isLoggedIn.asReadonly();
 
  constructor() {
  }

  login() {
    localStorage.setItem('token', 'fghjkfghjghjdfghjgfd');
    this._isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
  }

  isUserLoggedin(): boolean {
    const item = localStorage.getItem('token');
    return item !== null;
  }
}