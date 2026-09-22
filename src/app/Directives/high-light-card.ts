import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLightCard]',
})
export class HighLightCard 
{
    @Input() highlightColor: string = 'green';
  constructor(private elementRef: ElementRef) 
  {
    
  
    const cardElement = elementRef.nativeElement as HTMLElement;
   
  }
   @HostListener('mouseover') over(){
    const cardElement = this.elementRef.nativeElement as HTMLElement;
    cardElement.style.backgroundColor  = this.highlightColor;
   }
    @HostListener('mouseout') out(){
    const cardElement = this.elementRef.nativeElement as HTMLElement;
    cardElement.style.backgroundColor  = 'white';
    }
}
