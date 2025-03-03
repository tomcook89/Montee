import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DecimalPipe]
})
export class MortgageCalculatorComponent {
  mortgageForm: FormGroup;
  monthlyPayment: number | null = null;
  formattedPlaceholders: { purchasePrice: string; depositAmount: string; interestRate: string; loanTerm: string };

  constructor(private fb: FormBuilder, private decimalPipe: DecimalPipe) {
    this.mortgageForm = this.fb.group({
      purchasePrice: [250000],
      depositAmount: [50000],
      interestRate: [5.5],
      loanTerm: [25]
    });

    this.formattedPlaceholders = {
      purchasePrice: this.formatNumber(250000),
      depositAmount: this.formatNumber(50000),
      interestRate: this.formatNumber(5.5),
      loanTerm: this.formatNumber(25)
    };

    this.mortgageForm.valueChanges.subscribe(() => {
      this.calculateMonthlyPayment();
    });

    this.calculateMonthlyPayment();
  }

  calculateMonthlyPayment() {
    const { purchasePrice, depositAmount, interestRate, loanTerm } = this.mortgageForm.value;
    const principal = purchasePrice - depositAmount;
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      this.monthlyPayment = Math.round(principal / numPayments);
    } else {
      const factor = Math.pow(1 + monthlyRate, numPayments);
      this.monthlyPayment = Math.round(principal * (monthlyRate * factor) / (factor - 1));
    }
  }

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-0') ?? '';
  }
}