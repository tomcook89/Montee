import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberFormatService } from '../../_services/number-format.service';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MortgageCalculatorComponent implements OnInit {
  mortgageForm: FormGroup;
  monthlyPayment: number = 0;
  formattedPlaceholders: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private numberFormatService: NumberFormatService
  ) {
    this.mortgageForm = this.fb.group({
      purchasePrice: [250000, [Validators.required]],
      depositAmount: [50000, [Validators.required]],
      interestRate: [5.5, [Validators.required]],
      loanTerm: [25, [Validators.required]]
    });

    this.formatPlaceholders();
  }

  ngOnInit(): void {
    this.formatInitialValues();
    this.calculateMonthlyPayment();

    this.mortgageForm.valueChanges.subscribe(() => {
      this.calculateMonthlyPayment();
    });
  }

  private formatPlaceholders() {
    Object.keys(this.mortgageForm.controls).forEach(field => {
      const value = this.mortgageForm.get(field)?.value;
      this.formattedPlaceholders[field] = this.numberFormatService.formatNumber(value);
    });
  }

  private formatInitialValues() {
    Object.keys(this.mortgageForm.controls).forEach(field => {
      const value = this.mortgageForm.get(field)?.value;
      if (typeof value === 'number') {
        this.mortgageForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
      }
    });

    this.calculateMonthlyPayment();
  }

  calculateMonthlyPayment() {
    const purchasePrice = this.numberFormatService.parseNumber(this.mortgageForm.get('purchasePrice')?.value);
    const depositAmount = this.numberFormatService.parseNumber(this.mortgageForm.get('depositAmount')?.value);
    const interestRate = this.numberFormatService.parseNumber(this.mortgageForm.get('interestRate')?.value) / 100;
    const loanTerm = this.numberFormatService.parseNumber(this.mortgageForm.get('loanTerm')?.value) * 12;

    const loanAmount = purchasePrice - depositAmount;
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      this.monthlyPayment = 0;
      return;
    }

    const monthlyRate = interestRate / 12;
    this.monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
  }

  getBorrowingAmount(): number {
    const purchasePrice = this.numberFormatService.parseNumber(this.mortgageForm.get('purchasePrice')?.value);
    const depositAmount = this.numberFormatService.parseNumber(this.mortgageForm.get('depositAmount')?.value);
    return purchasePrice - depositAmount;
  }

  formatInput(event: any, field: string) {
    const value = this.numberFormatService.parseNumber(event.target.value);
    this.mortgageForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
    event.target.value = this.numberFormatService.formatNumber(value);
    this.calculateMonthlyPayment();
  }
}