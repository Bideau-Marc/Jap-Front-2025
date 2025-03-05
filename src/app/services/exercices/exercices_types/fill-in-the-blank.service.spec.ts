import { TestBed } from '@angular/core/testing';

import { FillInTheBlankService } from './fill-in-the-blank.service';

describe('FillInTheBlankService', () => {
  let service: FillInTheBlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillInTheBlankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
