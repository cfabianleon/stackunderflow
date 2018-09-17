import { TestBed, inject } from '@angular/core/testing';

import { LineaService } from './linea.service';

describe('LineaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineaService]
    });
  });

  it('should be created', inject([LineaService], (service: LineaService) => {
    expect(service).toBeTruthy();
  }));
});
