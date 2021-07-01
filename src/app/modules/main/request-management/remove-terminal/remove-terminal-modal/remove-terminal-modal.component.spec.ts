import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTerminalModalComponent } from './remove-terminal-modal.component';

describe('RemoveTerminalModalComponent', () => {
  let component: RemoveTerminalModalComponent;
  let fixture: ComponentFixture<RemoveTerminalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTerminalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTerminalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
