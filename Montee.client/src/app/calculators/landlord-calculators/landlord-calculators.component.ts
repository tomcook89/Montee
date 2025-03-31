import { Component } from '@angular/core';
import { BuyToLetCalculatorComponent } from './buy-to-let-calculator/buy-to-let-calculator.component';
import { GrossYieldCalculatorComponent } from './gross-yield-calculator/gross-yield-calculator.component';

@Component({
  selector: 'app-landlord-calculators',
  templateUrl: './landlord-calculators.component.html',
  styleUrls: ['./landlord-calculators.component.scss'],
  standalone: true,
  imports: [BuyToLetCalculatorComponent, GrossYieldCalculatorComponent]
})
export class LandlordCalculatorsComponent {
  activeTab: string = 'buyToLet';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
