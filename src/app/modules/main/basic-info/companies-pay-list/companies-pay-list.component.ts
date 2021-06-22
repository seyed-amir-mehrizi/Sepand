import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseInfoService } from '../base-info.service';

@Component({
  selector: 'app-companies-pay-list',
  templateUrl: './companies-pay-list.component.html',
  styleUrls: ['./companies-pay-list.component.css']
})
export class CompaniesPayListComponent implements OnInit {
  pspList: any = [];

  constructor(private baseInfoService : BaseInfoService  , private spinner: NgxSpinnerService,) { }


  ngOnInit(): void {
    this.getAllPspList();
  }


  getAllPspList() {
    this.spinner.show();
    this.baseInfoService.getPspList()
      .subscribe(res => {
        this.spinner.hide();
        this.pspList = res;
    })
  }

}
