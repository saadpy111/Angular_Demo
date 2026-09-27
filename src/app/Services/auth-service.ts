import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subject: BehaviorSubject<boolean>;

  constructor() {
    this.subject = new BehaviorSubject<boolean>(
      this.isLoggedin()
    );
  }

  behaviourSubject() {
    return this.subject;
  }

  login() {
    localStorage.setItem('token', 'fghjkfghjghjdfghjgfd');
    this.subject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.subject.next(false);
  }

  isLoggedin(): boolean {
    const item = localStorage.getItem('token');

    return item !== null;
  }
}