import { TestBed } from '@angular/core/testing';

import { IsLoggedInService } from './is-logged-in.service';

describe('IsLogedInService', () => {
  let service: IsLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
