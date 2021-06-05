import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesPayListComponent } from './companies-pay-list.component';

describe('CompaniesPayListComponent', () => {
  let component: CompaniesPayListComponent;
  let fixture: ComponentFixture<CompaniesPayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesPayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesPayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
