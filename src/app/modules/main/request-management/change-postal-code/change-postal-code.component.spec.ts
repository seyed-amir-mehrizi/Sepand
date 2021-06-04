import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePostalCodeComponent } from './change-postal-code.component';

describe('ChangePostalCodeComponent', () => {
  let component: ChangePostalCodeComponent;
  let fixture: ComponentFixture<ChangePostalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePostalCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePostalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
