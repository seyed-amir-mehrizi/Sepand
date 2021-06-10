import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customer-list/customers.service';

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
    Page: 1,

  }

  constructor(private service: CustomersService, private fb: FormBuilder ,
    private ngbModal: NgbModal, private toastr : ToastrService
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

    activateTerminal(item){
      this.service.activateTerminal(item.id)
      .subscribe((res:any)=>{
      })
    }

}
