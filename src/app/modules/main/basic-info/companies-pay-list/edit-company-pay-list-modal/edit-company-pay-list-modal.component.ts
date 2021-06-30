import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseInfoService } from '../../base-info.service';

@Component({
  selector: 'app-edit-company-pay-list-modal',
  templateUrl: './edit-company-pay-list-modal.component.html',
  styleUrls: ['./edit-company-pay-list-modal.component.css']
})
export class EditCompanyPayListModalComponent implements OnInit {

  addPspForm: FormGroup;
  isAddPspFormSubmitted = false;
  @Input() companyInfo;
  constructor(

    private fb: FormBuilder,
    private baseInfoService: BaseInfoService,
    public ngbActiveModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
    this.setValueForForm();
  }
  initFormBuilder() {
    this.addPspForm = this.fb.group({
      userShaparak: ['', [Validators.required, Validators.maxLength(50)]],
      passwordShaparak: ['', [Validators.required, Validators.maxLength(50)]],
      pspMmsUsername: ['', [Validators.required, Validators.maxLength(50)]],
      pspMmsPassword: ['', [Validators.required, Validators.maxLength(50)]],
      pspMmsPublicKey: ['', Validators.required],
      pspMmsPrivateKey: ['', Validators.required],
      shaparakFtpPublicKey: ['', Validators.required],
      shaparakFtpPrivateKey: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      alias: ['', [Validators.required, Validators.maxLength(150)]],
      shaparakFtpUsername: ['', [Validators.required, Validators.maxLength(50)]],
      shaparakFtpPassword: ['', [Validators.required, Validators.maxLength(50)]],
      iin: ['', [Validators.required, Validators.maxLength(10)]],
      terminalNo: ['', [Validators.required, Validators.maxLength(8)]],
      acceptorCode: ['', [Validators.required, Validators.maxLength(15)]]
    });
  }

  get addPspFormInfo() {
    return this.addPspForm.controls;
  }
  setValueForForm() {
    this.addPspForm.setValue({
      userShaparak: this.companyInfo.userShaparak,
      passwordShaparak: this.companyInfo.passwordShaparak,
      pspMmsUsername: this.companyInfo.pspMmsUsername,
      pspMmsPassword: this.companyInfo.pspMmsPassword,
      pspMmsPublicKey: this.companyInfo.pspMmsPublicKey,
      pspMmsPrivateKey: this.companyInfo.pspMmsPrivateKey,
      shaparakFtpPublicKey: this.companyInfo.shaparakFtpPublicKey,
      shaparakFtpPrivateKey: this.companyInfo.shaparakFtpPrivateKey,
      name: this.companyInfo.name,
      alias: this.companyInfo.alias,
      shaparakFtpUsername: this.companyInfo.shaparakFtpUsername,
      shaparakFtpPassword: this.companyInfo.shaparakFtpPassword,
      iin: this.companyInfo.iin,
      terminalNo: this.companyInfo.terminalNo,
      acceptorCode: this.companyInfo.acceptorCode
    })
  }
  editPayCompany(item) {
    this.isAddPspFormSubmitted = true;
    if (this.addPspForm.invalid) {
      return;
    }
    const dataSending = this.addPspForm.value;
    dataSending.id = this.companyInfo.id;
    this.baseInfoService.editPsp(dataSending)
      .subscribe(res => {
        this.ngbActiveModal.close();
      });

  }
}
