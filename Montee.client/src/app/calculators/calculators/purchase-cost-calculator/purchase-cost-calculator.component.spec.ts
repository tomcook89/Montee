import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCostCalculatorComponent } from './purchase-cost-calculator.component';

describe('PurchaseCostCalculatorComponent', () => {
  let component: PurchaseCostCalculatorComponent;
  let fixture: ComponentFixture<PurchaseCostCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCostCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCostCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
