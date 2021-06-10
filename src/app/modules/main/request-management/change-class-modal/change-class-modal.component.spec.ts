import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClassModalComponent } from './change-class-modal.component';

describe('ChangeClassModalComponent', () => {
  let component: ChangeClassModalComponent;
  let fixture: ComponentFixture<ChangeClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeClassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
