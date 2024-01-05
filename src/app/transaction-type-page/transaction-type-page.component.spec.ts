import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypePageComponent } from './transaction-type-page.component';

describe('TransactionTypePageComponent', () => {
  let component: TransactionTypePageComponent;
  let fixture: ComponentFixture<TransactionTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
