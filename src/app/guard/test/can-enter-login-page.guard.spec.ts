import {inject, TestBed} from '@angular/core/testing';

import {CanEnterLoginPageGuard} from '../can-enter-login-page.guard';

describe('CanEnterLoginPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanEnterLoginPageGuard]
    });
  });

  it('should ...', inject([CanEnterLoginPageGuard], (guard: CanEnterLoginPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
