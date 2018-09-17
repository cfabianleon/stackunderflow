import { TestBed, inject } from '@angular/core/testing';

import { AplicacionService } from './aplicacion.service';

describe('AplicacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicacionService]
    });
  });

  it('should be created', inject([AplicacionService], (service: AplicacionService) => {
    expect(service).toBeTruthy();
  }));
});
