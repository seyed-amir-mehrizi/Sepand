import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateTerminalComponent } from './activate-terminal.component';

describe('ActivateTerminalComponent', () => {
  let component: ActivateTerminalComponent;
  let fixture: ComponentFixture<ActivateTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
