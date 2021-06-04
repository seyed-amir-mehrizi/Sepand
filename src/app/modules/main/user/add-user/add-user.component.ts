import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  isAddUserSubmitted = false;
  constructor(
    public ngbActiveModal: NgbActiveModal,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
      mobile: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rePass: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    }, {
      validator: MustMatch('password', 'rePass')
    });
  }

  get addUserFormInfo() {
    return this.addUserForm.controls;
  }

  addUser(ngbActiveModalL:any) {
    this.isAddUserSubmitted = true;
    if (this.addUserForm.invalid) {
      return;
    }
    const dataSending = this.prepareDataForSend(this.addUserForm.value);
    // this.subcategoryService.addCategory(dataSending).subscribe(() => {
    //   ngbActiveModal.close();
    // });
  }

  prepareDataForSend(addUserFormValue:any) {
    const dataSending = addUserFormValue;
    // dataSending.type = parseInt(dataSending.type);
    dataSending.parentId = parseInt(dataSending.parentId);
    return dataSending;
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
  }
}
