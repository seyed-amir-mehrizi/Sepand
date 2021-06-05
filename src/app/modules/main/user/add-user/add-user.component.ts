import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  createUserForm: FormGroup;
  isAddUserSubmitted = false;
  Roleslist:any = [];
  constructor(
    public ngbActiveModal: NgbActiveModal,
    private fb: FormBuilder,
    private service : UserService,
 
  ) { }

  ngOnInit(): void {

   
    this.getAllRolesList();
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.createUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
      phoneNumber: ['', Validators.required],
      roleName: ['', Validators.required],
      username: ['', [Validators.required , Validators.minLength(3)]],
      password: ['', [Validators.required , Validators.minLength(6)]]
    }, {
      validator: MustMatch('password', 'rePass')
    });
  }

  get addUserFormInfo() {
    return this.createUserForm.controls;
  }

  addUser(item: any) {
    this.isAddUserSubmitted = true;
    if (this.createUserForm.invalid) {
      return;
    }
    const dataSending = this.createUserForm.value;
    this.service.createNewUser(dataSending).subscribe(() => {
        this.ngbActiveModal.close();
    });
  }


  getAllRolesList(){
    this.service.getRolesList()
    .subscribe((result:any)=>{
      this.Roleslist = result;
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
