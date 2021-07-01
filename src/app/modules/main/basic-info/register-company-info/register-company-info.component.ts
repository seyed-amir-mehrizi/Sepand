import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseInfoService } from '../base-info.service';

@Component({
  selector: 'app-register-company-info',
  templateUrl: './register-company-info.component.html',
  styleUrls: ['./register-company-info.component.css']
})
export class RegisterCompanyInfoComponent implements OnInit {
  addPspForm: FormGroup;
  isAddPspFormSubmitted = false;
  constructor(

    private fb: FormBuilder,
    private baseInfoService : BaseInfoService

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.addPspForm = this.fb.group({
      userShaparak: ['' , [Validators.required , Validators.maxLength(50)]],
      passwordShaparak: ['' , [Validators.required , Validators.maxLength(50)]],
      pspMmsUsername: ['' , [Validators.required , Validators.maxLength(50)]],
      pspMmsPassword: ['' , [Validators.required , Validators.maxLength(50)]],
      pspMmsPublicKey: ['' , Validators.required],
      pspMmsPrivateKey: ['' , Validators.required],
      shaparakFtpPublicKey: ['' , Validators.required],
      shaparakFtpPrivateKey: ['' , Validators.required],
      name: ['' , [Validators.required , Validators.maxLength(150)]],
      alias: ['' , [Validators.required , Validators.maxLength(150)]],
      shaparakFtpUsername: ['' , [Validators.required , Validators.maxLength(50)]],
      shaparakFtpPassword: ['' , [Validators.required , Validators.maxLength(50)]],
      iin: ['' , [Validators.required , Validators.maxLength(10)]],
      terminalNo: ['' , [Validators.required , Validators.maxLength(8)]],
      acceptorCode: ['' , [Validators.required , Validators.maxLength(15)]]
    });
  }

  get addPspFormInfo() {
    return this.addPspForm.controls;
  }
  addRequest(item){
    this.isAddPspFormSubmitted = true;
    if (this.addPspForm.invalid) {
      return;
    }
    const dataSending = this.addPspForm.value;
    this.baseInfoService.addNewPsp(dataSending)
    .subscribe(res=>{
      this.addPspForm.reset();
    this.isAddPspFormSubmitted = false;

    });
  }

  englishOnly = (event) => {
    const value = event.key;
    var p = /^[a-zA-Z0-9, ]*$/;
    if (!p.test(value)) {
      return false
  }
  return true;

  }

}
