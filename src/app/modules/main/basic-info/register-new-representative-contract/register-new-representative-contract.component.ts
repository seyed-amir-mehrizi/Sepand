import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-new-representative-contract',
  templateUrl: './register-new-representative-contract.component.html',
  styleUrls: ['./register-new-representative-contract.component.css']
})
export class RegisterNewRepresentativeContractComponent implements OnInit {

  registerNewContractForm!: FormGroup;
  isRegisterNewContractFormSubmitted = false;
  constructor(

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.registerNewContractForm = this.fb.group({
      contractDate: ['', Validators.required],
      description: ['', Validators.required],


    });
  }

  get registerNewContractFormSubmittedInfo() {
    return this.registerNewContractForm.controls;
  }
  addRequest(){

  }

}
