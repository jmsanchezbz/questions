import { TestBed } from '@angular/core/testing';

import { RouterLoggingService } from './router-logging.service';

describe('RouterLoggingService', () => {
  let service: RouterLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
