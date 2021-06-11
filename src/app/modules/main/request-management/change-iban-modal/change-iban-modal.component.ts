import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-iban-modal',
  templateUrl: './change-iban-modal.component.html',
  styleUrls: ['./change-iban-modal.component.css']
})
export class ChangeIbanModalComponent implements OnInit {

  @Input() ibanInfo;
  listOfIbans: any = [];
  BankInfoForm:FormGroup;
  isBankInfoFormSubmitted: boolean = false;
  sharedTypeList: any = [];
  hasPercentage : boolean = false;
  sharedTypeId:number;
  hasAmount:boolean = false;
  BankInfoList: any = [];

  
  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private sharedService: SharedDataService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getAllIbansList();
    this.initBankInfoForm();
    this.getListOfSharedTypes();
    this.toastr.info('لطفا شماره شبا را بدون IR ابتدایی وارد کنید' , 'توجه' , {
      timeOut: 10000,
    });
  }

  getAllIbansList() {
    let data = {
      customerId: this.ibanInfo.id
    }
    this.customerService.getAllIbansForCustomer(data)
      .subscribe((result: any) => {
        this.listOfIbans = result;
      });
  }
  getListOfSharedTypes() {
    this.sharedService
      .getSharedTypeCategories()
      .subscribe((res: any) => {
        this.sharedTypeList = res;
      });
  }

  get bankAccountInfoForm() {
    return this.BankInfoForm.controls;
  }

  initBankInfoForm(){
    this.BankInfoForm = this.fb.group({
      iban : ['' , [Validators.required , Validators.minLength(24) , , Validators.max(24)]],
      accountNumber : ['' , Validators.required],
      shareType : ['' , Validators.required],
      shareAmountMax : [''],
      shareAmountMin : [''],
      sharedAmount : [''],
      isMain : [false],
    });
  }

  checkMax(event) {
    const value =  parseInt(event.target.value);
    if (value > 100) {
      this.toastr.error('بیشترین مبلغ تسهیم 100 می باشد')
      event.target.value = '';
    }
  }

  checkMin(event) {
    const value =  parseInt(event.target.value);
    if (value < 0) {
      event.target.value = '';
    }
  }


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSharedTypeSelected(value: any) {
    this.sharedTypeId = parseInt(value.value.shareType);
    switch (this.sharedTypeId) {
      case 1:
        this.hasPercentage = true;
        this.hasAmount = false;

        value.value.sharedAmount = 0;
        break;
        case 2:
          this.hasPercentage = false;
          value.value.shareAmountMax = 0;
          value.value.shareAmountMin = 0;
          this.hasAmount = true;
        break;
    
      default:
        break;
    }
    
    
  }

  addBankInfo(value){
    
    if (this.BankInfoForm.invalid) {
      this.isBankInfoFormSubmitted = true;
      return;
    }
    console.log(value);

    let dataSending = this.BankInfoForm.value;
    switch (this.sharedTypeId) {
      case 1:
        dataSending.sharedAmount = 0;
        if((dataSending.shareAmountMax === null || dataSending.shareAmountMax === '')
         || (dataSending.shareAmountMin === null || dataSending.shareAmountMin === '')){
          this.toastr.error('کمترین مبلغ تسهیم و بیشترین مبلغ تسهیم را وارد کنید');
          return;
        }
        break;
        case 2:
          dataSending.shareAmountMax = 0;
          dataSending.shareAmountMin = 0;
          if(dataSending.sharedAmount=== null || dataSending.sharedAmount=== '' ){
            this.toastr.error(' مبلغ تسهیم را وارد کنید');
            return;
          }
        break;
      default:
        break;
    }
    dataSending.sharedAmount = parseInt(dataSending.sharedAmount);
    dataSending.shareAmountMax = parseInt(dataSending.shareAmountMax);
    dataSending.shareAmountMin = parseInt(dataSending.shareAmountMin);
    dataSending.shareType = parseInt(dataSending.shareType);
    dataSending.iban = `IR${dataSending.iban}`;
    dataSending.customerId = this.ibanInfo.id;
    dataSending.isMain = (dataSending.isMain === null) ? false : true;

    this.listOfIbans.push(dataSending);
    this.BankInfoForm.reset();
  }

  deleteIban(item , index){
    this.listOfIbans.splice(index , 1);
  }

  editIban(){
    this.customerService.changeIban(this.listOfIbans)
    .subscribe(res=>{
      this.ngbActiveModal.close();
    })
    


  }

}
