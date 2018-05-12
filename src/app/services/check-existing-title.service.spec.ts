import { TestBed, inject } from '@angular/core/testing';

import { CheckExistingTitleService } from './check-existing-title.service';

describe('CheckExistingTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckExistingTitleService]
    });
  });

  it('should be created', inject([CheckExistingTitleService], (service: CheckExistingTitleService) => {
    expect(service).toBeTruthy();
  }));
});
