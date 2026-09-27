import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { validate } from '@angular/forms/signals';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-navbar',
  styleUrl: './nav-bar.css',
  templateUrl: './nav-bar.html',
})

export class NavBar {


  protected readonly activeLink = signal('Shop all');
  protected readonly links: NavLink[] = [
    { label: 'Shop all', href: '#catalog-title' },
    { label: 'New in', href: '#catalog-title' },
    { label: 'Our story', href: '#footer' },
  ];
  private readonly _auth = inject(AuthService);

protected readonly isLoggedIn = this._auth.isloggedIn;  
  


  protected selectLink(label: string): void {
    this.activeLink.set(label);
  }
  

}
