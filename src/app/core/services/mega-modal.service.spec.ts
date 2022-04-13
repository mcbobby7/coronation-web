import { TestBed } from '@angular/core/testing';

import { MegaModalService } from './mega-modal.service';

describe('MegaModalService', () => {
  let service: MegaModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
