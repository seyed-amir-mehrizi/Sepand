import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerListInfoModalComponent } from './customer-list-info-modal/customer-list-info-modal.component';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerslist: any = [];
  page = 1;
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

  gridResult: any =  {};

  constructor(private service: CustomersService,
              private spinner: NgxSpinnerService,
              private ngbModal: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
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
    this.params.Page = pageNumber;
    this.spinner.show();
    this.service.getListOFCustomers(this.params)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();
      });

  }
  displayCustomerInfo(item){
    const modalRef = this.ngbModal.open(CustomerListInfoModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.customerInfo = item;
  }

  receiveDataFromFilter(data){
    this.customerslist = data.data;
    this.totalRecords = data.totalRecord;
  }
  receiveFilters(items){
    this.params = items;
  }

}
