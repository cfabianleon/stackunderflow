import { TestBed, inject } from '@angular/core/testing';

import { ApiProyectoService } from './api-proyecto.service';

describe('ApiProyectoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiProyectoService]
    });
  });

  it('should be created', inject([ApiProyectoService], (service: ApiProyectoService) => {
    expect(service).toBeTruthy();
  }));
});
