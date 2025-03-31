import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordCalculatorsComponent } from './landlord-calculators.component';

describe('LandlordCalculatorsComponent', () => {
  let component: LandlordCalculatorsComponent;
  let fixture: ComponentFixture<LandlordCalculatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordCalculatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandlordCalculatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
