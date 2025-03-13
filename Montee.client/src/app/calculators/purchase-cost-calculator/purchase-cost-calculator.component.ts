import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberFormatService } from '../../_services/number-format.service';
import { StampDutyService } from '../../_services/stamp-duty.service';

@Component({
  selector: 'app-purchase-cost-calculator',
  templateUrl: './purchase-cost-calculator.component.html',
  styleUrls: ['./purchase-cost-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PurchaseCostCalculatorComponent implements OnInit {
  purchaseCostForm: FormGroup;
  totalCosts: number = 0;
  formattedPlaceholders: { [key: string]: string } = {};
  stampDuty: number = 0;

  constructor(
    private fb: FormBuilder,
    private numberFormatService: NumberFormatService,
    private stampDutyService: StampDutyService
  ) {
    this.purchaseCostForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer', [Validators.required]],
      propertyPrice: [250000, [Validators.required]],
      mortgageFees: [1000, [Validators.required]],
      surveyFees: [500, [Validators.required]],
      legalFees: [1200, [Validators.required]],
      brokerFees: [800, [Validators.required]],
      movingCosts: [1500, [Validators.required]]
    });

    this.formatPlaceholders();
  }

  ngOnInit(): void {
    this.formatInitialValues();
    this.calculateTotalCosts();

    this.purchaseCostForm.valueChanges.subscribe(() => {
      this.calculateStampDuty();
      this.calculateTotalCosts();
    });
  }

  private formatPlaceholders() {
    Object.keys(this.purchaseCostForm.controls).forEach(field => {
      const value = this.purchaseCostForm.get(field)?.value;
      this.formattedPlaceholders[field] = this.numberFormatService.formatNumber(value);
    });
  }

  private formatInitialValues() {
    Object.keys(this.purchaseCostForm.controls).forEach(field => {
      const value = this.purchaseCostForm.get(field)?.value;
      if (typeof value === 'number') {
        this.purchaseCostForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
      }
    });

    this.calculateStampDuty();
  }

  calculateStampDuty() {
    const propertyPrice = this.numberFormatService.parseNumber(this.purchaseCostForm.get('propertyPrice')?.value);
    const reason = this.purchaseCostForm.get('reasonForBuying')?.value;
    this.stampDuty = this.stampDutyService.calculateStampDuty(propertyPrice, reason, true);
  }

  calculateTotalCosts() {
    const fees = Object.keys(this.purchaseCostForm.controls).reduce((acc, field) => {
      if (field !== 'reasonForBuying' && field !== 'propertyPrice') {
        return acc + this.numberFormatService.parseNumber(this.purchaseCostForm.get(field)?.value);
      }
      return acc;
    }, 0);
    this.totalCosts = fees + this.stampDuty;
  }

  formatInput(event: any, field: string) {
    const value = this.numberFormatService.parseNumber(event.target.value);
    this.purchaseCostForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
    event.target.value = this.numberFormatService.formatNumber(value);
    this.calculateStampDuty();
    this.calculateTotalCosts();
  }
}