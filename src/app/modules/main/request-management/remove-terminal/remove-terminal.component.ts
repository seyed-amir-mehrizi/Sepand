import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customer-list/customers.service';
import { RemoveTerminalModalComponent } from './remove-terminal-modal/remove-terminal-modal.component';

@Component({
  selector: 'app-remove-terminal',
  templateUrl: './remove-terminal.component.html',
  styleUrls: ['./remove-terminal.component.css']
})
export class RemoveTerminalComponent implements OnInit {


  customerslist: any = [];
  page = 1;
  customerFilter: FormGroup;
  maxSize: number;
  totalRecords: number;
  params = {
    NationalId: '',
    ForeignPervasiveCode: '',
    RegisterNo: '',
    Name: '',
    LastName: '',
    ShopName: '',
    CustomerId: '',

    Page: 1,

  };
  userRole;
  constructor(private service: CustomersService, private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private ngbModal: NgbModal, private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
    this.userRole = localStorage.getItem('r') ;

  }
  getCustomers(params: any) {
    this.spinner.show();
    this.service.getListOFCustomers(params)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();

      });
  }

  clickOnPage(pageNumber: any) {
    this.spinner.show();
    this.params.Page = pageNumber;
    this.service.getListOFCustomers(this.params)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();

      });

  }
  deActivateTerminal(item) {
    this.spinner.show();
    this.service.deActivateTerminal(item.id)
      .subscribe((res: any) => {
        this.spinner.hide();
      });
  }

  onOpenDeActivateTerminalModal(item){
    const modalRef = this.ngbModal.open(RemoveTerminalModalComponent, { size: 'lg', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.removeTerminalInfo = item;
    modalRef.result.then(() => {
      this.getCustomers(this.params);
    }, () => {
    });
  }
  receiveDataFromFilter(data){
    this.customerslist = data.data;
    this.totalRecords = data.totalRecord;
  }
  receiveFilters(items){
    this.params = items;
  }


}
