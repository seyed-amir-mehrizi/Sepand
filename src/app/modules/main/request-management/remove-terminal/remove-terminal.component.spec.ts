import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTerminalComponent } from './remove-terminal.component';

describe('RemoveTerminalComponent', () => {
  let component: RemoveTerminalComponent;
  let fixture: ComponentFixture<RemoveTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
