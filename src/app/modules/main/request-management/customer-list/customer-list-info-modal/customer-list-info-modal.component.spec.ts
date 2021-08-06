import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListInfoModalComponent } from './customer-list-info-modal.component';

describe('CustomerListInfoModalComponent', () => {
  let component: CustomerListInfoModalComponent;
  let fixture: ComponentFixture<CustomerListInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
