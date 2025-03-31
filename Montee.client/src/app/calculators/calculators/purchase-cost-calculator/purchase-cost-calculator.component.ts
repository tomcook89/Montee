import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorFormService } from '../../../_services/calculator-form.service';
import { NumberFormatService } from '../../../_services/number-format.service';
import { StampDutyService } from '../../../_services/stamp-duty.service';

@Component({
  selector: 'app-purchase-cost-calculator',
  templateUrl: './purchase-cost-calculator.component.html',
  styleUrls: ['./purchase-cost-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PurchaseCostCalculatorComponent implements OnInit {
  private calcForm = inject(CalculatorFormService);
  private numberFormatService = inject(NumberFormatService);
  private stampDutyService = inject(StampDutyService);
  purchaseCostForm: FormGroup;

  stampDuty = 0;
  totalCosts = 0;

  formattedPlaceholders = {
    propertyPrice: 'e.g. 250,000',
    mortgageFees: 'e.g. 1,000',
    surveyFees: 'e.g. 500',
    legalFees: 'e.g. 1,500',
    brokerFees: 'e.g. 1,000',
    movingCosts: 'e.g. 2,000'
  };

  constructor(private fb: FormBuilder) {
    this.purchaseCostForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer'],
      propertyPrice: ['250000'],
      mortgageFees: ['1000'],
      surveyFees: ['500'],
      legalFees: ['1500'],
      brokerFees: ['1000'],
      movingCosts: ['2000']
    });
  }

  ngOnInit(): void {
    this.calcForm.formatAllControls(this.purchaseCostForm);
    this.purchaseCostForm.valueChanges.subscribe(() => this.updateCosts());
    this.updateCosts();
  }

  formatInput(controlName: string): void {
    this.calcForm.formatSingleControl(this.purchaseCostForm, controlName);
    this.updateCosts();
  }

  updateCosts(): void {
    const form = this.purchaseCostForm.value;
    const price = this.numberFormatService.parseNumber(form.propertyPrice);
    const reason = form.reasonForBuying;

    this.stampDuty = this.stampDutyService.calculateStampDuty(price, reason, true);

    const fees = ['mortgageFees', 'surveyFees', 'legalFees', 'brokerFees', 'movingCosts']
      .map(key => this.numberFormatService.parseNumber(form[key]))
      .reduce((sum, val) => sum + val, 0);

    this.totalCosts = this.stampDuty + fees;
  }
}
