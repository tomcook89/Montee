import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberFormatService } from '../../_services/number-format.service';
import { StampDutyService } from '../../_services/stamp-duty.service';

@Component({
  selector: 'app-stamp-duty-calculator',
  templateUrl: './stamp-duty-calculator.component.html',
  styleUrls: ['./stamp-duty-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class StampDutyCalculatorComponent implements OnInit {
  stampDutyForm: FormGroup;
  stampDutyCurrent: number = 0;
  stampDutyFuture: number = 0;
  formattedPlaceholders: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private numberFormatService: NumberFormatService, 
    private stampDutyService: StampDutyService
  ) {
    this.stampDutyForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer', [Validators.required]],
      propertyPrice: [250000, [Validators.required]]
    });

    this.formatPlaceholders();
  }

  ngOnInit(): void {
    this.formatInitialValues();
    this.calculateStampDuty();

    this.stampDutyForm.valueChanges.subscribe(() => {
      this.calculateStampDuty();
    });
  }

  private formatPlaceholders() {
    Object.keys(this.stampDutyForm.controls).forEach(field => {
      const value = this.stampDutyForm.get(field)?.value;
      this.formattedPlaceholders[field] = this.numberFormatService.formatNumber(value);
    });
  }

  private formatInitialValues() {
    Object.keys(this.stampDutyForm.controls).forEach(field => {
      const value = this.stampDutyForm.get(field)?.value;
      if (typeof value === 'number') {
        this.stampDutyForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
      }
    });

    this.calculateStampDuty();
  }

  calculateStampDuty() {
    const propertyPrice = this.numberFormatService.parseNumber(this.stampDutyForm.get('propertyPrice')?.value);
    const reason = this.stampDutyForm.get('reasonForBuying')?.value;
    this.stampDutyCurrent = this.stampDutyService.calculateStampDuty(propertyPrice, reason, true);
    this.stampDutyFuture = this.stampDutyService.calculateStampDuty(propertyPrice, reason, false);
  }

  formatInput(event: any, field: string) {
    const value = this.numberFormatService.parseNumber(event.target.value);
    this.stampDutyForm.patchValue({ [field]: this.numberFormatService.formatNumber(value) }, { emitEvent: false });
    event.target.value = this.numberFormatService.formatNumber(value);
    this.calculateStampDuty();
  }
}