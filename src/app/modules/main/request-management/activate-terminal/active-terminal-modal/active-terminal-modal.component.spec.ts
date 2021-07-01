import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTerminalModalComponent } from './active-terminal-modal.component';

describe('ActiveTerminalModalComponent', () => {
  let component: ActiveTerminalModalComponent;
  let fixture: ComponentFixture<ActiveTerminalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTerminalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTerminalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
