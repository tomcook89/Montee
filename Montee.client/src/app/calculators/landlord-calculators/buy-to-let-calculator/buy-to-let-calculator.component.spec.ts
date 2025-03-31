import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyToLetCalculatorComponent } from './buy-to-let-calculator.component';

describe('BuyToLetCalculatorComponent', () => {
  let component: BuyToLetCalculatorComponent;
  let fixture: ComponentFixture<BuyToLetCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyToLetCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyToLetCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
