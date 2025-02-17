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
      loanAmount: [200000],
      interestRate: [5],
      loanTerm: [25]
    });
  }

  calculate() {
    const { loanAmount, interestRate, loanTerm } = this.mortgageForm.value;
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;
    this.monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }
}