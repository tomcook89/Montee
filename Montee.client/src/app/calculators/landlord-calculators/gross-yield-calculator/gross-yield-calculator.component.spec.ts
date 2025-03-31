import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossYieldCalculatorComponent } from './gross-yield-calculator.component';

describe('GrossYieldCalculatorComponent', () => {
  let component: GrossYieldCalculatorComponent;
  let fixture: ComponentFixture<GrossYieldCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrossYieldCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrossYieldCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
