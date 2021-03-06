import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../customer-list/customers.service';
import { SendingDocumentsModalComponent } from '../sending-documents-modal/sending-documents-modal.component';

@Component({
  selector: 'app-sending-documents',
  templateUrl: './sending-documents.component.html',
  styleUrls: ['./sending-documents.component.css']
})
export class SendingDocumentsComponent implements OnInit {

  customerslist: any = [];
  page: number = 1;
  customerFilter: FormGroup;
  maxSize: number;
  totalRecords: number;
  userRole;
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

  constructor(private service: CustomersService, private fb: FormBuilder ,
    private spinner: NgxSpinnerService,
    private ngbModal: NgbModal, 
    ) { }

  ngOnInit(): void {
    this.getCustomers(this.params);
    this.initForm();
    this.userRole = localStorage.getItem('r') ;

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

  opneIbanModal(item){
    const modalRef = this.ngbModal.open(SendingDocumentsModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.rowInfo = item;
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
