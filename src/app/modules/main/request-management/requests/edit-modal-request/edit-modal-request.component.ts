import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../../customer-list/customers.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-edit-modal-request',
  templateUrl: './edit-modal-request.component.html',
  styleUrls: ['./edit-modal-request.component.css']
})
export class EditModalRequestComponent implements OnInit {
  @Input() rowInfo;
  editRequestForm:FormGroup;
  people$: Observable<Object | any[]>;
  isCompanyNameDisable : boolean = false;
  isEditRequestFormSubmitted: boolean = false;
  constructor(

    private requestService: RequestsService,
    private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initFrom();
    this.setValueForInput();
    this.getListOfGuild();

  }

  getListOfGuild() {
    // this.sharedService.getAllGuildsCategories().subscribe((res: any) => {
    //   this.guildList = res;
    // });
    this.people$ =  this.sharedService.getAllGuildsCategories();
  }


  initFrom(){
    this.editRequestForm = this.fb.group({
      firstNameFa: [''],
      lastNameFa: [''],
      comNameEn: [''],
      comNameFa: [''],
      shopPostalCode: [''],
      shopTelephoneNumber: [''],
      shopCityPreCode: [''],
      redirectUrl: [''],
      guildId: [''],
      taxPayerCode: [''],
    });
  }
  setValueForInput(){
    this.editRequestForm.setValue({
      firstNameFa:this.rowInfo.customer.person.firstNameFa,
      lastNameFa:this.rowInfo.customer.person.lastNameFa,
      comNameEn:this.rowInfo.customer.person.comNameEn,
      comNameFa:this.rowInfo.customer.person.comNameFa,
      shopPostalCode:this.rowInfo.customer.shopPostalCode,
      shopTelephoneNumber:this.rowInfo.customer.shopTelephoneNumber,
      shopCityPreCode:this.rowInfo.customer.shopCityPreCode,
      redirectUrl:this.rowInfo.customer.redirectUrl,
      guildId:this.rowInfo.customer.guildId,
      taxPayerCode:this.rowInfo.customer.taxPayerCode,
    })
    if(this.rowInfo.customer.person.comNameFa){
      this.isCompanyNameDisable = true
    }
  }

  get getRequestFormInfo(){
    return this.editRequestForm.controls;
  }


  editRequest(){
    if (this.editRequestForm.invalid) {
      this.isEditRequestFormSubmitted = true;
      return;
    } 
    const dataSending = this.editRequestForm.value;
    dataSending.id = this.rowInfo.id;
    this.requestService.editrequest(dataSending)
    .subscribe((res=>{
      this.ngbActiveModal.close();
    }))
    
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
