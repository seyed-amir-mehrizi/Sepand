import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    ShopName: '',
    Page: 1,

  }
  changeClassCodeForm!: FormGroup;
  isChangeClassFormSubmitted = false;
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
      ShopName: [''],
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
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord
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

}
