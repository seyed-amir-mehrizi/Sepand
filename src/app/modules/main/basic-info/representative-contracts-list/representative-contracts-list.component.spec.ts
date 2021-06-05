import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeContractsListComponent } from './representative-contracts-list.component';

describe('RepresentativeContractsListComponent', () => {
  let component: RepresentativeContractsListComponent;
  let fixture: ComponentFixture<RepresentativeContractsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeContractsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeContractsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
