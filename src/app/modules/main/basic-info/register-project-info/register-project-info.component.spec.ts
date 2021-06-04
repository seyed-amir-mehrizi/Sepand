import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProjectInfoComponent } from './register-project-info.component';

describe('RegisterProjectInfoComponent', () => {
  let component: RegisterProjectInfoComponent;
  let fixture: ComponentFixture<RegisterProjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProjectInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
