import { TestBed } from '@angular/core/testing';

import { IsLogedOutService } from './is-loged-out.service';

describe('IsLogedOutService', () => {
  let service: IsLogedOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLogedOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
