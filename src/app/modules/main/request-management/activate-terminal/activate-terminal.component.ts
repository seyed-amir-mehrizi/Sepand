import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customer-list/customers.service';
import { ActiveTerminalModalComponent } from './active-terminal-modal/active-terminal-modal.component';

@Component({
  selector: 'app-activate-terminal',
  templateUrl: './activate-terminal.component.html',
  styleUrls: ['./activate-terminal.component.css']
})
export class ActivateTerminalComponent implements OnInit {

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
  userRole;
  constructor(private service: CustomersService, private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private ngbModal: NgbModal, private toastr: ToastrService,
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
    this.spinner.show();
    this.params.CustomerId = item.CustomerId;
    this.params.ForeignPervasiveCode = item.ForeignPervasiveCode;
    this.params.LastName = item.LastName;
    this.params.Name = item.Name;
    this.params.NationalId = item.NationalId;
    this.params.RegisterNo = item.RegisterNo;
    this.params.ShopName = item.ShopName;
    item.Page = this.page;
    item.Page = 1;
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();

      });


  }

  activateTerminal(item) {
    this.spinner.show();
    this.service.activateTerminal(item.id)
      .subscribe((res: any) => {
        this.spinner.hide();
      })
  }
  FarsiOnly = (event) => {
    const value = event.key;
    var p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(value)) {
      return false
  }
  return true;

  }
  
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onOpenActiveTerminalModal(item){
    const modalRef = this.ngbModal.open(ActiveTerminalModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.terminalInfo = item;
    modalRef.result.then(() => {
      this.getCustomers(this.params);
    }, () => {
    });
  }

}
