import { Injectable, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NumberFormatService {
  private decimalPipe = inject(DecimalPipe);

  formatNumber(value: any): string {
    if (typeof value !== 'number') return String(value);
    return this.decimalPipe.transform(value, '1.0-0') ?? '';
  }

  parseNumber(value: any): number {
    if (value === null || value === undefined) return 0;
    const strValue = String(value);
    return parseInt(strValue.replace(/,/g, ''), 10) || 0;
  }
}