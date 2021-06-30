import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { BaseInfoService } from '../../base-info.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit {
  @Input() projectInfo;
  registerProjectInfo!: FormGroup;
  isRegisterProjectInfoFormSubmitted = false;
  sharedTypeList: any = [];
  hasPercentage: boolean = false;
  sharedTypeId: number;
  hasAmount: boolean = false;
  constructor(

    private fb: FormBuilder,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
    private baseInfoService: BaseInfoService,
    public ngbActiveModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
    this.getListOfSharedTypes();
    this.setValueForForm();
  }
  initFormBuilder() {
    this.registerProjectInfo = this.fb.group({
      projectName: ['', Validators.required],
      shareType: ['', Validators.required],
      shareAmountMax: [''],
      shareAmountMin: [''],
      sharedAmount: [''],
    });
  }

  get registerProjectInfoFormSubmittedInfo() {
    return this.registerProjectInfo.controls;
  }
  getListOfSharedTypes() {
    this.sharedService
      .getSharedTypeCategories()
      .subscribe((res: any) => {
        this.sharedTypeList = res;
      });
  }

  onSharedTypeSelected(value: any) {
    this.registerProjectInfo.patchValue({
      shareAmountMax: '',
      shareAmountMin:'',
      sharedAmount: '',
    });
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
  checkMax(event) {
    const value = parseInt(event.target.value);
    if (value > 100) {
      this.toastr.error('بیشترین مبلغ تسهیم 100 می باشد')
      event.target.value = '';
    }
  }

  checkMin(event) {
    const value = parseInt(event.target.value);
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

  setValueForForm() {
    this.registerProjectInfo.setValue({
      projectName: this.projectInfo.projectName,
      shareType: this.projectInfo.shareTypeEnum,
      shareAmountMax: this.projectInfo.shareAmountMax,
      shareAmountMin: this.projectInfo.shareAmountMin,
      sharedAmount: this.projectInfo.sharedAmount,
    })
    switch (this.projectInfo.shareType) {
      case "1":
        this.hasPercentage = true;
        this.hasAmount = false;
        break;
      case "static":
        this.hasPercentage = false;
        this.hasAmount = true;
        break;

      default:
        break;
    }

  }

  editProject(item) {
    if (this.registerProjectInfo.invalid) {
      this.isRegisterProjectInfoFormSubmitted = true;
      return;
    }
    let dataSending = this.registerProjectInfo.value;
    switch (this.sharedTypeId) {
      case 1:
        dataSending.sharedAmount = 0;
        if ((dataSending.shareAmountMax === null || dataSending.shareAmountMax === '')
          || (dataSending.shareAmountMin === null || dataSending.shareAmountMin === '')) {
          this.toastr.error('کمترین مبلغ تسهیم و بیشترین مبلغ تسهیم را وارد کنید');
          return;
        }
        else if (parseInt(dataSending.shareAmountMin) > parseInt(dataSending.shareAmountMax)) {
          this.toastr.error('کمترین مبلغ تسهیم نمی تواند از بیشترین مبلغ تسهیم بیشتر باشد');
          return;
        }
        break;
      case 2:
        dataSending.shareAmountMax = 0;
        dataSending.shareAmountMin = 0;
        if (dataSending.sharedAmount === null || dataSending.sharedAmount === '') {
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
    dataSending.id = this.projectInfo.id;
    this.baseInfoService.editProject(dataSending)
      .subscribe((res => {
        this.ngbActiveModal.close();
      }))
  }

}
