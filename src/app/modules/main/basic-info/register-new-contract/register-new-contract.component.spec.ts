import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewContractComponent } from './register-new-contract.component';

describe('RegisterNewContractComponent', () => {
  let component: RegisterNewContractComponent;
  let fixture: ComponentFixture<RegisterNewContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
