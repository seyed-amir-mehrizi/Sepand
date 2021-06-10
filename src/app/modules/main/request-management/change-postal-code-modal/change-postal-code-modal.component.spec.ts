import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePostalCodeModalComponent } from './change-postal-code-modal.component';

describe('ChangePostalCodeModalComponent', () => {
  let component: ChangePostalCodeModalComponent;
  let fixture: ComponentFixture<ChangePostalCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePostalCodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePostalCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
