import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResMortgagesComponent } from './res-mortgages.component';

describe('ResMortgagesComponent', () => {
  let component: ResMortgagesComponent;
  let fixture: ComponentFixture<ResMortgagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResMortgagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResMortgagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
