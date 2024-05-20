import { TestBed } from '@angular/core/testing';

import { FormSignalServiceService } from './form-signal-service.service';

describe('FormSignalServiceService', () => {
  let service: FormSignalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSignalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
