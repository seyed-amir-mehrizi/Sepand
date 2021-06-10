import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePostalCodeModalComponent } from '../change-postal-code-modal/change-postal-code-modal.component';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-postal-code',
  templateUrl: './change-postal-code.component.html',
  styleUrls: ['./change-postal-code.component.css']
})
export class ChangePostalCodeComponent implements OnInit {
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

    openChangePostalCodeModal(item){
      const modalRef = this.ngbModal.open(ChangePostalCodeModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
      modalRef.componentInstance.postalCodeInfo = item;
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
  
  }






