import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeBuyerMortgagesComponent } from './first-time-buyer-mortgages.component';

describe('FirstTimeBuyerMortgagesComponent', () => {
  let component: FirstTimeBuyerMortgagesComponent;
  let fixture: ComponentFixture<FirstTimeBuyerMortgagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeBuyerMortgagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeBuyerMortgagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
