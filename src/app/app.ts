import { Component, signal } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { Home } from './components/home/home';
import { Footer } from './components/footer/footer';
import { Parent } from './components/parent/parent';
import { Child } from './components/child/child';


@Component({
  imports: [NavBar, Home, Footer,Parent , Child],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  protected readonly title = signal('my-angular-app');
}
