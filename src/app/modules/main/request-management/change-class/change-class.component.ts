import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeClassModalComponent } from '../change-class-modal/change-class-modal.component';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-class',
  templateUrl: './change-class.component.html',
  styleUrls: ['./change-class.component.css']
})
export class ChangeClassComponent implements OnInit {
  customerslist: any = [];
  page = 1;
  userRole;
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
  item;

  constructor(private service: CustomersService, private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private ngbModal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
    this.userRole = localStorage.getItem('r');
  }

  getDataFromFilter(item) {
    this.item = item;
    this.totalRecords = item.totalRecord;
    this.customerslist = item.data;
  }
  getCustomers(params: any) {
    this.spinner.show();
    this.service.getListOFCustomers(params)
      .subscribe((result: any) => {
        this.customerslist = null;
        this.totalRecords = null;
        this.spinner.hide();
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
      });
  }

  clickOnPage(pageNumber: any) {
    this.spinner.show();
    this.params.Page = pageNumber;
    this.getCustomers(this.params);
  }
  openChangeClass(item) {
    const modalRef = this.ngbModal.open(ChangeClassModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.classInfo = item;
    modalRef.result.then(() => {
      this.getCustomers(this.params);
    }, () => {
    });
  }
  receiveDataFromFilter(data) {
    this.customerslist = data.data;
    this.totalRecords = data.totalRecord;
  }
  receiveFilters(items) {
    this.params = items;
  }


}
