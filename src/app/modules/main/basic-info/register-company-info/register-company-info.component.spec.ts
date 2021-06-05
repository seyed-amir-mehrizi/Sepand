import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyInfoComponent } from './register-company-info.component';

describe('RegisterCompanyInfoComponent', () => {
  let component: RegisterCompanyInfoComponent;
  let fixture: ComponentFixture<RegisterCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
