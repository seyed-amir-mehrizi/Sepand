import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-class',
  templateUrl: './change-class.component.html',
  styleUrls: ['./change-class.component.css']
})
export class ChangeClassComponent implements OnInit {

  changeClassCodeForm!: FormGroup;
  isChangeClassFormSubmitted = false;
  constructor(

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.changeClassCodeForm = this.fb.group({
      customerNo: ['', Validators.required],
      classCode: ['', Validators.required],
    });
  }

  get changeClassFormSubmittedInfo() {
    return this.changeClassCodeForm.controls;
  }
  addRequest(){

  }

}
