import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-postal-code',
  templateUrl: './change-postal-code.component.html',
  styleUrls: ['./change-postal-code.component.css']
})
export class ChangePostalCodeComponent implements OnInit {
  changePostalCodeForm!: FormGroup;
  isChangePostalCodeFormSubmitted = false;
  constructor(

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.changePostalCodeForm = this.fb.group({
      customerNo: ['', Validators.required],
      companyPayCode: ['', Validators.required],
    });
  }

  get changePostalCodeFormSubmittedInfo() {
    return this.changePostalCodeForm.controls;
  }
  addRequest(){

  }


}
