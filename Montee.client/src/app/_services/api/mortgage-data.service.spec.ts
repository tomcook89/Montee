import { TestBed } from '@angular/core/testing';

import { MortgageDataService } from './mortgage-data.service';

describe('MortgageDataService', () => {
  let service: MortgageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
