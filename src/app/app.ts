import { Component, signal } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [NavBar, RouterOutlet, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  protected readonly title = signal('my-angular-app');
}
