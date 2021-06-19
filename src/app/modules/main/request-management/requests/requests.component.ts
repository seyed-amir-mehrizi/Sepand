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
    this.requestService.getListOfFirstRegistration(item)
      .subscribe((result: any) => {
        this.requestslist = result.data;
        this.totalRecords = result.totalRecord;
        this.spinner.hide();
      });
  }


  onNavChange(changeEvent: NgbNavChangeEvent) {
    switch (changeEvent.nextId) {
      case 1:

      //1
        break;
      case 2:
    //2

        break;
      case 3:
      //3


        break;
        case 4:
        //4
  
  
          break;

      default:
        break;
    }
  }


}
