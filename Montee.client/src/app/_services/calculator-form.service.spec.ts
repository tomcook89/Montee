import { TestBed } from '@angular/core/testing';

import { CalculatorFormService } from './calculator-form.service';

describe('CalculatorFormService', () => {
  let service: CalculatorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
