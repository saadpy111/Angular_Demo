import { Component, signal } from '@angular/core';
import { Contactusdetails } from '../contactusdetails/contactusdetails';

@Component({
  imports: [Contactusdetails],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly contactOpen = signal(false);

  protected toggleContact(): void {
    this.contactOpen.update((isOpen) => !isOpen);
  }

  protected closeContact(): void {
    this.contactOpen.set(false);
  }
}
