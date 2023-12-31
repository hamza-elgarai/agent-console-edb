import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdbHeaderComponent } from './edb-header.component';

describe('EdbHeaderComponent', () => {
  let component: EdbHeaderComponent;
  let fixture: ComponentFixture<EdbHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdbHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
