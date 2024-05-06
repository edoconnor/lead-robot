import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePlainText',
})
export class SafePlainTextPipe implements PipeTransform {
  transform(value: string): string {
    // Remove HTML tags
    return value.replace(/<[^>]*>/g, '');
  }
}