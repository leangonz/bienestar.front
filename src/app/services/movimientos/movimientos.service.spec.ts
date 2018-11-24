import { TestBed, inject } from '@angular/core/testing';

import { MovimientosService } from './movimientos.service';

describe('MovimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientosService]
    });
  });

  it('should be created', inject([MovimientosService], (service: MovimientosService) => {
    expect(service).toBeTruthy();
  }));
});
