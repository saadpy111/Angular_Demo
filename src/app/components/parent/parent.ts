import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Child } from '../child/child';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule , FormsModule , Child], 
  selector: 'app-parent',
  styleUrl: './parent.css',
  templateUrl: './parent.html',
})
export class Parent implements AfterViewInit 
{
  ngAfterViewInit() {
    this.squareh1.nativeElement.style.color = 'red';
    this.squareh1.nativeElement.style.fontSize = '20px';

    console.log(this.childComponent);
  }
 num1:number=0;
 num2:number=0;
 squre:number=0;
 @ViewChild('squareid') squareh1!:ElementRef;
@ViewChild(Child) childComponent!: Child;
calcSquare(num:number)
{
  this.squre = num*num;   
      this.childComponent.sum = 100;
} 

 
}
