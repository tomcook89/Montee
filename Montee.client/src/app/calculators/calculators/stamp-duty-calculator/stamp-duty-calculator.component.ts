import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorFormService } from '../../../_services/calculator-form.service';
import { NumberFormatService } from '../../../_services/number-format.service';
import { StampDutyService } from '../../../_services/stamp-duty.service';

@Component({
  selector: 'app-stamp-duty-calculator',
  templateUrl: './stamp-duty-calculator.component.html',
  styleUrls: ['./stamp-duty-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class StampDutyCalculatorComponent implements OnInit {
  private calcForm = inject(CalculatorFormService);
  private numberFormatService = inject(NumberFormatService);
  private stampDutyService = inject(StampDutyService);
  stampDutyForm: FormGroup;

  stampDutyCurrent = 0;
  stampDutyFuture = 0;

  formattedPlaceholders = {
    propertyPrice: 'e.g. 250,000'
  };

  constructor(private fb: FormBuilder) {
    this.stampDutyForm = this.fb.group({
      reasonForBuying: ['firstTimeBuyer'],
      propertyPrice: ['250000']
    });
  }

  ngOnInit(): void {
    this.calcForm.formatAllControls(this.stampDutyForm);
    this.stampDutyForm.valueChanges.subscribe(() => this.updateStampDuty());
    this.updateStampDuty();
  }

  formatInput(controlName: string): void {
    this.calcForm.formatSingleControl(this.stampDutyForm, controlName);
    this.updateStampDuty();
  }

  updateStampDuty(): void {
    const form = this.stampDutyForm.value;
    const price = this.numberFormatService.parseNumber(form.propertyPrice);
    const reason = form.reasonForBuying;

    this.stampDutyCurrent = this.stampDutyService.calculateStampDuty(price, reason, true);
    this.stampDutyFuture = this.stampDutyService.calculateStampDuty(price, reason, false);
  }
}
