import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewRepresentativeContractComponent } from './register-new-representative-contract.component';

describe('RegisterNewRepresentativeContractComponent', () => {
  let component: RegisterNewRepresentativeContractComponent;
  let fixture: ComponentFixture<RegisterNewRepresentativeContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewRepresentativeContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewRepresentativeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
