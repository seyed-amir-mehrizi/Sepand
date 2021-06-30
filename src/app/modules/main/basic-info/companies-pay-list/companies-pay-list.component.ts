import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseInfoService } from '../base-info.service';
import { EditCompanyPayListModalComponent } from './edit-company-pay-list-modal/edit-company-pay-list-modal.component';

@Component({
  selector: 'app-companies-pay-list',
  templateUrl: './companies-pay-list.component.html',
  styleUrls: ['./companies-pay-list.component.css']
})
export class CompaniesPayListComponent implements OnInit {
  pspList: any = [];

  constructor(private baseInfoService : BaseInfoService  ,
    private ngbModal: NgbModal, 
    private spinner: NgxSpinnerService,) { }


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

  onOpenEditModal(item){
    const modalRef = this.ngbModal.open(EditCompanyPayListModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.companyInfo = item;
    modalRef.result.then(() => {
      this.getAllPspList();
    },()=>{
      
    });
  }

  deleteCompanyPay(id){
    this.baseInfoService.deletePsp(id)
    .subscribe(res=>{
      this.getAllPspList();
    })
  }

}
