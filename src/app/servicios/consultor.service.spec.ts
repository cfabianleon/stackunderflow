import { TestBed, inject } from '@angular/core/testing';

import { ConsultorService } from './consultor.service';

describe('ConsultorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultorService]
    });
  });

  it('should be created', inject([ConsultorService], (service: ConsultorService) => {
    expect(service).toBeTruthy();
  }));
});
