import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent implements OnInit {

  addRequestForm!: FormGroup;
  isAddRequestFormSubmitted = false;
  constructor(

    private fb : FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.addRequestForm = this.fb.group({
      customerNo: ['', Validators.required],
      requestNo: ['', Validators.required],
    });
  }

  get addRequestFormInfo() {
    return this.addRequestForm.controls;
  }
  addRequest(){

  }

}
