import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorFormService } from '../../../_services/calculator-form.service';
import { NumberFormatService } from '../../../_services/number-format.service';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MortgageCalculatorComponent implements OnInit {
  private calcForm = inject(CalculatorFormService);
  private numberFormatService = inject(NumberFormatService);
  mortgageForm: FormGroup;

  monthlyPayment = 0;

  formattedPlaceholders = {
    purchasePrice: 'e.g. 250,000',
    depositAmount: 'e.g. 50,000',
    interestRate: 'e.g. 5',
    loanTerm: 'e.g. 25'
  };

  constructor(private fb: FormBuilder) {
    this.mortgageForm = this.fb.group({
      purchasePrice: ['250000'],
      depositAmount: ['50000'],
      interestRate: ['5'],
      loanTerm: ['25']
    });
  }

  ngOnInit(): void {
    this.calcForm.formatAllControls(this.mortgageForm);
    this.mortgageForm.valueChanges.subscribe(() => this.updateMonthlyPayment());
    this.updateMonthlyPayment();
  }

  formatInput(controlName: string): void {
    this.calcForm.formatSingleControl(this.mortgageForm, controlName);
    this.updateMonthlyPayment();
  }

  getBorrowingAmount(): number {
    const price = this.numberFormatService.parseNumber(this.mortgageForm.get('purchasePrice')?.value);
    const deposit = this.numberFormatService.parseNumber(this.mortgageForm.get('depositAmount')?.value);
    return price - deposit;
  }

  updateMonthlyPayment(): void {
    const form = this.mortgageForm.value;
  
    const price = this.numberFormatService.parseNumber(form.purchasePrice);
    const deposit = this.numberFormatService.parseNumber(form.depositAmount);
    const principal = price - deposit;
    const rate = this.numberFormatService.parseNumber(form.interestRate) / 100 / 12;
    const term = this.numberFormatService.parseNumber(form.loanTerm) * 12;
  
    if (principal > 0 && rate > 0 && term > 0) {
      const payment = principal * rate / (1 - Math.pow(1 + rate, -term));
      this.monthlyPayment = Math.round(payment);
    } else {
      this.monthlyPayment = 0;
    }
  }  
}
