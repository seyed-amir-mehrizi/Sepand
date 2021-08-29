import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-info-modal',
  templateUrl: './customer-info-modal.component.html',
  styleUrls: ['./customer-info-modal.component.css']
})
export class CustomerInfoModalComponent implements OnInit {

  @Input() customerInfo;
  constructor(    public ngbActiveModal: NgbActiveModal, ) { }

  ngOnInit(): void {
  }

}
