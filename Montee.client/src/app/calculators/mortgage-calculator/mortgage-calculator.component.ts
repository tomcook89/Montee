import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MortgageCalculatorComponent {
  mortgageForm: FormGroup;
  monthlyPayment: number | null = null;

  constructor(private fb: FormBuilder) {
    this.mortgageForm = this.fb.group({
      purchasePrice: [250000],
      depositAmount: [25000],
      interestRate: [5.5],
      loanTerm: [25]
    });

    this.mortgageForm.valueChanges.subscribe(() => {
      this.calculate();
    });

    this.calculate();
  }

  calculate() {
    const { purchasePrice, depositAmount, interestRate, loanTerm } = this.mortgageForm.value;
    const loanAmount = purchasePrice - depositAmount;

    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      this.monthlyPayment = null;
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;
    this.monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }
}