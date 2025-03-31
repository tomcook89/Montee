import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculatorFormService } from '../../../_services/calculator-form.service';
import { NumberFormatService } from '../../../_services/number-format.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gross-yield-calculator',
  templateUrl: './gross-yield-calculator.component.html',
  styleUrls: ['./gross-yield-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class GrossYieldCalculatorComponent implements OnInit {
  private calcForm = inject(CalculatorFormService);
  private numberFormatService = inject(NumberFormatService);
  form: FormGroup;

  yield = 0;

  formattedPlaceholders = {
    annualRent: 'e.g. 15,000',
    propertyPrice: 'e.g. 250,000'
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      annualRent: ['15000'],
      propertyPrice: ['250000']
    });
  }

  ngOnInit(): void {
    this.calcForm.formatAllControls(this.form);
    this.form.valueChanges.subscribe(() => this.calculateYield());
    this.calculateYield();
  }

  formatInput(controlName: string): void {
    this.calcForm.formatSingleControl(this.form, controlName);
    this.calculateYield();
  }

  calculateYield(): void {
    const form = this.form.value;
    const rent = this.numberFormatService.parseNumber(form.annualRent);
    const price = this.numberFormatService.parseNumber(form.propertyPrice);
    this.yield = (rent > 0 && price > 0) ? ((rent / price) * 100) : 0;
  }
}