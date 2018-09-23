import { TestBed, inject } from '@angular/core/testing';

import { CombosService } from './combos.service';

describe('CombosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombosService]
    });
  });

  it('should be created', inject([CombosService], (service: CombosService) => {
    expect(service).toBeTruthy();
  }));
});
