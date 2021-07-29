import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingDocumentsComponent } from './sending-documents.component';

describe('SendingDocumentsComponent', () => {
  let component: SendingDocumentsComponent;
  let fixture: ComponentFixture<SendingDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendingDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
