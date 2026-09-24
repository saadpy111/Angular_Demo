import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule , FormsModule],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child implements OnChanges
{
   sum:number=0;
   @Output() sumchange:EventEmitter<number> = new EventEmitter<number>();
   ngOnChanges() {
    this.sum =Number(this.num1) + Number(this.num2);
    this.sumchange.emit(this.sum);
   }
   @Input() num1: number =0;
   @Input() num2: number =0;
}
