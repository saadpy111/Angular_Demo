import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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
  protected readonly isLoggedIn = signal(false);
  protected readonly activeLink = signal('Shop all');
  protected readonly links: NavLink[] = [
    { label: 'Shop all', href: '#catalog-title' },
    { label: 'New in', href: '#catalog-title' },
    { label: 'Our story', href: '#footer' },
  ];

  protected selectLink(label: string): void {
    this.activeLink.set(label);
  }

  protected login(): void {
    this.isLoggedIn.set(true);
  }

  protected logout(): void {
    this.isLoggedIn.set(false);
  }
}
