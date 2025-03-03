import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StampDutyService } from '../../_services/stamp-duty.service';

@Component({
  selector: 'app-purchase-cost-calculator',
  templateUrl: './purchase-cost-calculator.component.html',
  styleUrls: ['./purchase-cost-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DecimalPipe]
})
export class PurchaseCostCalculatorComponent {
  purchaseCostForm: FormGroup;
  totalCosts: number = 0;
  stampDuty: number = 0;
  formattedPlaceholders: { propertyPrice: string; mortgageFees: string; surveyFees: string; legalFees: string; brokerFees: string; movingCosts: string };

  constructor(private fb: FormBuilder, private stampDutyService: StampDutyService, private decimalPipe: DecimalPipe) {
    this.purchaseCostForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer'],
      propertyPrice: [250000],
      mortgageFees: [1000],
      surveyFees: [500],
      legalFees: [1500],
      brokerFees: [750],
      movingCosts: [750]
    });

    this.formattedPlaceholders = {
      propertyPrice: this.formatNumber(250000),
      mortgageFees: this.formatNumber(1000),
      surveyFees: this.formatNumber(500),
      legalFees: this.formatNumber(1500),
      brokerFees: this.formatNumber(750),
      movingCosts: this.formatNumber(750)
    };

    this.purchaseCostForm.valueChanges.subscribe(() => {
      this.calculateTotalCosts();
    });

    this.calculateTotalCosts();
  }

  calculateTotalCosts() {
    const { reasonForBuying, propertyPrice, mortgageFees, surveyFees, legalFees, brokerFees, movingCosts } = this.purchaseCostForm.value;
    this.stampDuty = this.stampDutyService.calculateStampDuty(propertyPrice, reasonForBuying, true);
    this.totalCosts = this.stampDuty + mortgageFees + surveyFees + legalFees + brokerFees + movingCosts;
  }

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-0') ?? '';
  }
}