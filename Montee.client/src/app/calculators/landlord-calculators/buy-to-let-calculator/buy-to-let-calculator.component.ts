import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculatorFormService } from '../../../_services/calculator-form.service';
import { NumberFormatService } from '../../../_services/number-format.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-to-let-calculator',
  templateUrl: './buy-to-let-calculator.component.html',
  styleUrls: ['./buy-to-let-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class BuyToLetCalculatorComponent implements OnInit {
  private calcForm = inject(CalculatorFormService);
  private numberFormatService = inject(NumberFormatService);
  buyToLetForm: FormGroup;

  ltv = 0;
  rentRange = { from: 0, to: 0 };

  formattedPlaceholders = {
    purchasePrice: 'e.g. 250,000',
    mortgageAmount: 'e.g. 187,500'
  };

  constructor(private fb: FormBuilder) {
    this.buyToLetForm = this.fb.group({
      purchasePrice: ['250000'],
      mortgageAmount: ['187500']
    });
  }

  ngOnInit(): void {
    this.calcForm.formatAllControls(this.buyToLetForm);
    this.buyToLetForm.valueChanges.subscribe(() => this.updateValues());
    this.updateValues();
  }

  formatInput(controlName: string): void {
    this.calcForm.formatSingleControl(this.buyToLetForm, controlName);
    this.updateValues();
  }

  updateValues(): void {
    const form = this.buyToLetForm.value;
    const price = this.numberFormatService.parseNumber(form.purchasePrice);
    const mortgage = this.numberFormatService.parseNumber(form.mortgageAmount);
  
    this.ltv = price > 0 ? (mortgage / price) * 100 : 0;
    this.rentRange = {
      from: mortgage * 0.045,
      to: mortgage * 0.065
    };
  }
}
