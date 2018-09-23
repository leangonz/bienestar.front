import { TestBed, inject } from '@angular/core/testing';

import { InsumoService } from './insumo.service';

describe('InsumoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsumoService]
    });
  });

  it('should be created', inject([InsumoService], (service: InsumoService) => {
    expect(service).toBeTruthy();
  }));
});
