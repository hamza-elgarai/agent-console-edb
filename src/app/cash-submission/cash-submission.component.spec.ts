import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSubmissionComponent } from './cash-submission.component';

describe('AccountDebitSubmissionComponent', () => {
  let component: CashSubmissionComponent;
  let fixture: ComponentFixture<CashSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
