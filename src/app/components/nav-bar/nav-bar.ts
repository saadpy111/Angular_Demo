import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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

export class NavBar implements OnInit {
  protected isLoggedIn =  signal(false) ;


  protected readonly activeLink = signal('Shop all');
  protected readonly links: NavLink[] = [
    { label: 'Shop all', href: '#catalog-title' },
    { label: 'New in', href: '#catalog-title' },
    { label: 'Our story', href: '#footer' },
  ];
  constructor(private _auth:AuthService){
      
  }
  ngOnInit(): void {
    this._auth.behaviourSubject().subscribe({
      next: (value) => {
        this.isLoggedIn.set(value);
     
      },
    });
  }

  protected selectLink(label: string): void {
    this.activeLink.set(label);
  }
  

}
