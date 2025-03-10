import { TestBed } from '@angular/core/testing';

import { CochesService } from './coche.service';

describe('CocheService', () => {
  let service: CochesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CochesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
