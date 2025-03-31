import { Component } from '@angular/core';
import { MortgageCalculatorComponent } from "./mortgage-calculator/mortgage-calculator.component";
import { StampDutyCalculatorComponent } from "./stamp-duty-calculator/stamp-duty-calculator.component";
import { PurchaseCostCalculatorComponent } from "./purchase-cost-calculator/purchase-cost-calculator.component";

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.scss'],
  standalone: true,
  imports: [MortgageCalculatorComponent, StampDutyCalculatorComponent, PurchaseCostCalculatorComponent]
})
export class CalculatorsComponent {
  activeTab: string = 'mortgage';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}