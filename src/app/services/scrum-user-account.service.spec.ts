import { TestBed, inject } from '@angular/core/testing';

import { ScrumUserAccountService } from './scrum-user-account.service';

describe('ScrumUserAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrumUserAccountService]
    });
  });

  it('should be created', inject([ScrumUserAccountService], (service: ScrumUserAccountService) => {
    expect(service).toBeTruthy();
  }));
});
