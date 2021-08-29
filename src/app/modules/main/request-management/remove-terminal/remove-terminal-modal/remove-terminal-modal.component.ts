import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../../customer-list/customers.service';

@Component({
  selector: 'app-remove-terminal-modal',
  templateUrl: './remove-terminal-modal.component.html',
  styleUrls: ['./remove-terminal-modal.component.css']
})
export class RemoveTerminalModalComponent implements OnInit {
  @Input() removeTerminalInfo;
  constructor(private service: CustomersService  , public ngbActiveModal: NgbActiveModal, ) { }

  ngOnInit(): void {
  }

  deActivateTerminal() {
    this.service.deActivateTerminal(this.removeTerminalInfo.id)
      .subscribe((res: any) => {
        this.ngbActiveModal.close();
      });
  }

}
