import { TestBed, inject } from '@angular/core/testing';

import { AtencionService } from './atencion.service';

describe('AtencionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtencionService]
    });
  });

  it('should be created', inject([AtencionService], (service: AtencionService) => {
    expect(service).toBeTruthy();
  }));
});
