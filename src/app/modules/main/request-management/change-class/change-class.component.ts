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
    CustomerId:'',
    Page: 1,
  }
  item;

  constructor(private service: CustomersService, private fb: FormBuilder ,
    private spinner: NgxSpinnerService,
    private ngbModal: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
    this.initForm();
  }

  getDataFromFilter(item) {
    this.item = item;
    this.totalRecords = item.totalRecord;
    this.customerslist = item.data;
  }

  initForm() {
    this.customerFilter = this.fb.group({
      NationalId: [''],
      ForeignPervasiveCode: [''],
      RegisterNo: [''],
      Name: [''] ,
      LastName: [''] ,
      ShopName: [''] ,
      CustomerId: [''] ,

    });
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


  serachCustomer(item: any) {
    this.params.CustomerId = item.CustomerId;
    this.params.ForeignPervasiveCode = item.ForeignPervasiveCode;
    this.params.LastName = item.LastName;
    this.params.Name = item.Name;
    this.params.NationalId = item.NationalId;
    this.params.RegisterNo = item.RegisterNo;
    this.params.ShopName = item.ShopName;
    item.Page = this.page;
    this.spinner.show();
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
    this.spinner.hide();

      });
  }

  openChangeClass(item){
    const modalRef = this.ngbModal.open(ChangeClassModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.classInfo = item;
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
