import { TestBed } from '@angular/core/testing';

import { BaseInfoService } from './base-info.service';

describe('BaseInfoService', () => {
  let service: BaseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
