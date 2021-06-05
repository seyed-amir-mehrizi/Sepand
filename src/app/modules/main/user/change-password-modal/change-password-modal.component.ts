import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {

  changePasswordForm:FormGroup;
  isChangePasswordSubmitted:boolean = false;
  @Input () userInfo:any;
  constructor(    private fb: FormBuilder , private service : UserService,   public ngbActiveModal: NgbActiveModal, ) { }

  ngOnInit(): void {
    console.log("this.userInfo : " , this.userInfo);
    
    this.initLoginform();
  }

  initLoginform(){
    this.changePasswordForm = this.fb.group({
      username : [this.userInfo.username , Validators.required],
      oldPassword : ['' , Validators.required],
      newPassword : ['' , Validators.required],
      confirmNewPassword : ['' , Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmNewPassword')
    });
  }
  get changePasswordFormInfo(){
    return this.changePasswordForm.controls;
  }
  changePassword(item:any){
    if (this.changePasswordForm.invalid) {
      this.isChangePasswordSubmitted = true;
      return;
    }
    const dataSending = this.changePasswordForm.value;
    this.service.changePassword(dataSending)
    .subscribe((resuslt:any)=>{
      this.ngbActiveModal.close();
    })
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
