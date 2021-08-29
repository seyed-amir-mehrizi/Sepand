import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-list-info-modal',
  templateUrl: './customer-list-info-modal.component.html',
  styleUrls: ['./customer-list-info-modal.component.css']
})
export class CustomerListInfoModalComponent implements OnInit {
  @Input() customerInfo;
  constructor(    public ngbActiveModal: NgbActiveModal, ) { }

  ngOnInit(): void {
  }

}
