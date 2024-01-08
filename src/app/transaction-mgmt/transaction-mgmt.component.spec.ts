import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMgmtComponent } from './transaction-mgmt.component';

describe('AccountDebitSubmissionComponent', () => {
  let component: TransactionMgmtComponent;
  let fixture: ComponentFixture<TransactionMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
