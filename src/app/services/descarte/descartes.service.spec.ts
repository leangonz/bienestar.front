import { TestBed, inject } from '@angular/core/testing';

import { DescartesService } from './descartes.service';

describe('DescartesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescartesService]
    });
  });

  it('should be created', inject([DescartesService], (service: DescartesService) => {
    expect(service).toBeTruthy();
  }));
});
