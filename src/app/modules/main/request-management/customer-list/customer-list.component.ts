import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerslist:any = [];
  page:number =1;
  customerFilter:FormGroup;
  constructor(private service : CustomersService , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getCustomers();
    this.initForm();
  }

  initForm(){
    this.customerFilter = this.fb.group({
      NationalId:[''],
      ShopName:[''],
    });
  }


  getCustomers(){
    let data = {
      NationalId:'',
      ShopName:''
    };
    this.service.getListOFCustomers(data)
    .subscribe((result:any)=>{
      this.customerslist = result.data;
    });
  }

  // clickOnPage(pageNumber){
  //   this.command.optionalFilter.page = pageNumber;
  //    this.getCommentList(this.command)
  //  }


  serachCustomer(item:any){
    this.service.getListOFCustomers(item)
    .subscribe((result:any)=>{
      this.customerslist = result.data;
    });

    
  }

}
