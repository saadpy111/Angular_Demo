import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pow',
})
export class PowPipe implements PipeTransform {
  transform(value: number): number {
    return Math.pow(value, 2);
  }
}
