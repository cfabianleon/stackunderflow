import { TestBed, inject } from '@angular/core/testing';

import { RolguardService } from './rolguard.service';

describe('RolguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolguardService]
    });
  });

  it('should be created', inject([RolguardService], (service: RolguardService) => {
    expect(service).toBeTruthy();
  }));
});
