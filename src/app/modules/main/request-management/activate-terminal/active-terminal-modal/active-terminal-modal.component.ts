import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../../customer-list/customers.service';

@Component({
  selector: 'app-active-terminal-modal',
  templateUrl: './active-terminal-modal.component.html',
  styleUrls: ['./active-terminal-modal.component.css']
})
export class ActiveTerminalModalComponent implements OnInit {
@Input() terminalInfo;
  constructor(private service: CustomersService  , public ngbActiveModal: NgbActiveModal, ) { }

  ngOnInit(): void {
  }

  activateTerminal(){
    this.service.activateTerminal(this.terminalInfo.id)
      .subscribe((res: any) => {
        this.ngbActiveModal.close();
      });
  }

}
