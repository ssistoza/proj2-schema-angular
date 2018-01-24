import { TestBed, inject } from '@angular/core/testing';

import { AddBoardService } from './add-board.service';

describe('AddBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddBoardService]
    });
  });

  it('should be created', inject([AddBoardService], (service: AddBoardService) => {
    expect(service).toBeTruthy();
  }));
});
