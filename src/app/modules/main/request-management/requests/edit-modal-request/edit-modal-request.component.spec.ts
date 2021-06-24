import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalRequestComponent } from './edit-modal-request.component';

describe('EditModalRequestComponent', () => {
  let component: EditModalRequestComponent;
  let fixture: ComponentFixture<EditModalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
