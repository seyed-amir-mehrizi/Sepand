import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIbanComponent } from './change-iban.component';

describe('ChangeIbanComponent', () => {
  let component: ChangeIbanComponent;
  let fixture: ComponentFixture<ChangeIbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeIbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
