import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClassComponent } from './change-class.component';

describe('ChangeClassComponent', () => {
  let component: ChangeClassComponent;
  let fixture: ComponentFixture<ChangeClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
