import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDebitSubmissionComponent } from './account-debit-submission.component';

describe('AccountDebitSubmissionComponent', () => {
  let component: AccountDebitSubmissionComponent;
  let fixture: ComponentFixture<AccountDebitSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDebitSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDebitSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
