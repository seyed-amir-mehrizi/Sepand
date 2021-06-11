import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIbanModalComponent } from './change-iban-modal.component';

describe('ChangeIbanModalComponent', () => {
  let component: ChangeIbanModalComponent;
  let fixture: ComponentFixture<ChangeIbanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeIbanModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIbanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
