import { TestBed } from '@angular/core/testing';

import { FamilyManagementService } from './family-management.service';

describe('FamilyManagementService', () => {
  let service: FamilyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
