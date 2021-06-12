import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeIbanModalComponent } from '../change-iban-modal/change-iban-modal.component';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-iban',
  templateUrl: './change-iban.component.html',
  styleUrls: ['./change-iban.component.css']
})
export class ChangeIbanComponent implements OnInit {

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
    private spinner: NgxSpinnerService,
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


  serachCustomer(item: any) {
    item.Page = 1;
    this.spinner.show();
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();
      });
  }

  opneIbanModal(item){
    const modalRef = this.ngbModal.open(ChangeIbanModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.ibanInfo = item;
    modalRef.result.then(() => {
      this.getCustomers(this.params);
    }, () => {
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  FarsiOnly = (event) => {
    const value = event.key;
    var p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(value)) {
      return false
  }
  return true;

  }

}
