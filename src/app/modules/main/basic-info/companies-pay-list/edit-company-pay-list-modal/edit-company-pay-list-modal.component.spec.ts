import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyPayListModalComponent } from './edit-company-pay-list-modal.component';

describe('EditCompanyPayListModalComponent', () => {
  let component: EditCompanyPayListModalComponent;
  let fixture: ComponentFixture<EditCompanyPayListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyPayListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyPayListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
