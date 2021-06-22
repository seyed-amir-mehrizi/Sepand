import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from 'src/app/modules/main/request-management/customer-list/customers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
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
  customerFilter: FormGroup;
  data;
  @Input() customerslist: any = [];
  @Input() totalRecords: number;
  @Output() getFilterData = new EventEmitter();



  constructor(private service: CustomersService, private fb: FormBuilder , private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
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
      CustomerId: [''] ,

    });
  }
  serachCustomer(item: any) {
    item.Page = 1;
    this.spinner.show();
    this.service.getListOFCustomers(item)
      .subscribe((result: any) => {
        this.data = result;
        this.customerslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();
        this.getFilterData.emit(result);
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
