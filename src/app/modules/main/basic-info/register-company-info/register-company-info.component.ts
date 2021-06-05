import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-company-info',
  templateUrl: './register-company-info.component.html',
  styleUrls: ['./register-company-info.component.css']
})
export class RegisterCompanyInfoComponent implements OnInit {
  registerShaCompanyForm!: FormGroup;
  isRegisterShaCompanyFormSubmitted = false;
  constructor(

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.registerShaCompanyForm = this.fb.group({
      shaUser: ['', Validators.required],
    });
  }

  get registerShaCompanyFormSubmittedInfo() {
    return this.registerShaCompanyForm.controls;
  }
  addRequest(){

  }

}
