import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingDocumentsModalComponent } from './sending-documents-modal.component';

describe('SendingDocumentsModalComponent', () => {
  let component: SendingDocumentsModalComponent;
  let fixture: ComponentFixture<SendingDocumentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendingDocumentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingDocumentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
