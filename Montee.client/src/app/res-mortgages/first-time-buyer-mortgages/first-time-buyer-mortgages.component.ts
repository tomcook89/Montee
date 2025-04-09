import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface MortgageDeal {
  lender: string;
  product: string;
  rate: string;
  period: string;
  aprc: string;
  fees: string;
  monthlyPayment: string;
}

@Component({
  selector: 'app-first-time-buyer-mortgages',
  templateUrl: './first-time-buyer-mortgages.component.html',
  styleUrls: ['./first-time-buyer-mortgages.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FirstTimeBuyerMortgagesComponent implements OnInit {
  private fb = inject(FormBuilder);
  filterForm: FormGroup;

  mortgageDeals: MortgageDeal[] = [];
  filteredDeals: MortgageDeal[] = [];

  constructor() {
    this.filterForm = this.fb.group({
      purchasePrice: ['500000'],
      borrowAmount: ['250000'],
      mortgageLength: ['25'],
      repaymentType: ['repayment'],
      mortgageTypes: this.fb.group({
        fixed: [true],
        variable: [true]
      }),
      productPeriod: ['any'],
      offset: [false],
      noEarlyRepayment: [false]
    });
  }

  ngOnInit(): void {
    this.loadDeals();
    this.runSearch();
  }

  loadDeals(): void {
    this.mortgageDeals = [
      {
        lender: 'Barclays',
        product: '2 Year Fixed',
        rate: '4.89%',
        period: '2 Years',
        aprc: '5.2%',
        fees: '£999',
        monthlyPayment: '£1,321'
      },
      {
        lender: 'Nationwide',
        product: '5 Year Fixed',
        rate: '4.55%',
        period: '5 Years',
        aprc: '4.9%',
        fees: '£0',
        monthlyPayment: '£1,287'
      }
    ];
  }

  runSearch(): void {
    const form = this.filterForm.value;

    const selectedTypes = Object.entries(form.mortgageTypes)
      .filter(([_, selected]) => selected)
      .map(([key]) => key);

    this.filteredDeals = this.mortgageDeals.filter(deal => {
      const typeMatch = selectedTypes.some(type => deal.product.toLowerCase().includes(type));
      const periodMatch =
        form.productPeriod === 'any' ||
        deal.period.toLowerCase().includes(form.productPeriod);

      return typeMatch && periodMatch;
    });
  }

  get resultsCount(): number {
    return this.filteredDeals.length;
  }
}