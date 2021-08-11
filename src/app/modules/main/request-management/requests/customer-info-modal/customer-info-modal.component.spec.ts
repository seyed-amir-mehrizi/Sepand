import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoModalComponent } from './customer-info-modal.component';

describe('CustomerInfoModalComponent', () => {
  let component: CustomerInfoModalComponent;
  let fixture: ComponentFixture<CustomerInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
