import { TestBed, inject } from '@angular/core/testing';

import { ServiciosClienteService } from './servicios-cliente.service';

describe('ServiciosClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiciosClienteService]
    });
  });

  it('should be created', inject([ServiciosClienteService], (service: ServiciosClienteService) => {
    expect(service).toBeTruthy();
  }));
});
