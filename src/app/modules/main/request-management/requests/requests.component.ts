import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { BaseInfoService } from '../../basic-info/base-info.service';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  active;
  disabled = true;
  reqestTypeList:any = [];
  pspList:any = [];
  page: number = 1;
  requestFilter: FormGroup;
  maxSize: number;
  totalRecords: number;
  params = {
    NationalId: '',
    ForeignPervasiveCode: '',
    LegalNationalCode: '',
    RequestType: '',
    PspId: '',
    ShopName: '',
    Page: 1,

  }
  tabId:number = 1;

  requestslist:any = [];
  constructor(private sharedDateService : SharedDataService 
    , private fb: FormBuilder ,  private spinner: NgxSpinnerService,
    private requestService : RequestsService,
    private ngbModal: NgbModal, 
    private baseInfoService : BaseInfoService) { }

  ngOnInit(): void {
    this.initForm();
    this.getRequestTypeList();
    this.getPspList();

  }

  
  initForm() {
    this.requestFilter = this.fb.group({
      NationalId: [''],
      ForeignPervasiveCode: [''],
      LegalNationalCode: [''],
      RequestType: [''] ,
      PspId: [''] ,
      ShopName: [''] ,
    });
  }

  getRequestTypeList(){
    this.sharedDateService.getAllRequestType()
    .subscribe((res=>{
      this.reqestTypeList = res;
    }))
  }
  getPspList(){
    this.baseInfoService.getPspList()
    .subscribe((res=>{
      this.pspList = res;
    }))
  }

  serachRequest(item: any) {
    item.Page = 1;
    this.spinner.show();
    switch (this.tabId) {
      case 1:
        this.requestService.getListOfFirstRegistration(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
      case 2:
        this.requestService.getListOfSentToPsp(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
      case 3:
        this.requestService.getListOfShaparakProcess(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
        case 4:
          this.requestService.getListOfCompletedRequests(item)
          .subscribe((result: any) => {
            this.requestslist = result.data;
            this.totalRecords = result.totalRecord;
            this.spinner.hide();
          });
          break;

      default:
        break;
    }
  }


  onNavChange(changeEvent: NgbNavChangeEvent ,item) {
    this.tabId = changeEvent.nextId;
    item.Page = 1;
    this.spinner.show();
    switch (this.tabId) {
      case 1:
        this.requestService.getListOfFirstRegistration(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
      case 2:
        this.requestService.getListOfSentToPsp(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
      case 3:
        this.requestService.getListOfShaparakProcess(item)
        .subscribe((result: any) => {
          this.requestslist = result.data;
          this.totalRecords = result.totalRecord;
          this.spinner.hide();
        });
        break;
        case 4:
          this.requestService.getListOfCompletedRequests(item)
          .subscribe((result: any) => {
            this.requestslist = result.data;
            this.totalRecords = result.totalRecord;
            this.spinner.hide();
          });
          break;

      default:
        break;
    }
  }


}
