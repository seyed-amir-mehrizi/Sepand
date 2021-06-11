import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerslist: any = [];
  page: number = 1;
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
    Page: 1,

  }

  constructor(private service: CustomersService, private fb: FormBuilder ,
    private ngbModal: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
    this.initForm();
  }

  initForm() {
    this.customerFilter = this.fb.group({
      NationalId: [''],
      ForeignPervasiveCode: [''],
      RegisterNo: [''],
      Name: [''] ,
      LastName: [''] ,
      ShopName: [''] ,
    });
  }


  getCustomers(params: any) {    
    this.service.getListOFCustomers(params)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord
      });
  }

  clickOnPage(pageNumber: any) {
    this.params.Page = pageNumber;
    this.service.getListOFCustomers(this.params)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord
      });

  }

  serachCustomer(item: any) {
    item.Page = 1;
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord
      });
  }


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
