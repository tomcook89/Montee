import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyToLetComponent } from './buy-to-let.component';

describe('BuyToLetComponent', () => {
  let component: BuyToLetComponent;
  let fixture: ComponentFixture<BuyToLetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyToLetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyToLetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
