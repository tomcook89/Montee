import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StampDutyService } from '../../_services/stamp-duty.service';

@Component({
  selector: 'app-stamp-duty-calculator',
  templateUrl: './stamp-duty-calculator.component.html',
  styleUrls: ['./stamp-duty-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DecimalPipe]
})
export class StampDutyCalculatorComponent {
  stampDutyForm: FormGroup;
  stampDutyCurrent: number = 0;
  stampDutyFuture: number = 0;
  formattedPlaceholders: { propertyPrice: string };

  constructor(private fb: FormBuilder, private stampDutyService: StampDutyService, private decimalPipe: DecimalPipe) {
    this.stampDutyForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer'],
      propertyPrice: [250000]
    });

    this.formattedPlaceholders = {
      propertyPrice: this.formatNumber(250000)
    };

    this.stampDutyForm.valueChanges.subscribe(() => {
      this.calculateStampDuty();
    });

    this.calculateStampDuty();
  }

  calculateStampDuty() {
    const { reasonForBuying, propertyPrice } = this.stampDutyForm.value;
    this.stampDutyCurrent = this.stampDutyService.calculateStampDuty(propertyPrice, reasonForBuying, true);
    this.stampDutyFuture = this.stampDutyService.calculateStampDuty(propertyPrice, reasonForBuying, false);
  }

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-0') ?? '';
  }
}