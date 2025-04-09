import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NumberFormatService } from './number-format.service';

@Injectable({ providedIn: 'root' })
export class CalculatorFormService {
  private numberFormatService = inject(NumberFormatService);

  formatAllControls(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const value = form.get(key)?.value;
  
      if (typeof value === 'string' && isNaN(Number(value.replace(/,/g, '')))) return;
  
      const formatted = this.numberFormatService.formatNumber(
        this.numberFormatService.parseNumber(value)
      );
      form.get(key)?.setValue(formatted, { emitEvent: false });
    });
  }

  formatSingleControl(form: FormGroup, controlName: string): void {
    const raw = form.get(controlName)?.value;
    const formatted = this.numberFormatService.formatNumber(
      this.numberFormatService.parseNumber(raw)
    );
    form.get(controlName)?.setValue(formatted, { emitEvent: false });
  }
}