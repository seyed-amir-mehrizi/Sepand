import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-project-info',
  templateUrl: './register-project-info.component.html',
  styleUrls: ['./register-project-info.component.css']
})
export class RegisterProjectInfoComponent implements OnInit {

  registerProjectInfo!: FormGroup;
  isRegisterProjectInfoFormSubmitted:boolean = false;
  constructor(

    private fb : FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.registerProjectInfo = this.fb.group({
      projectName: ['', Validators.required],

    });
  }

  get registerProjectInfoFormSubmittedInfo() {
    return this.registerProjectInfo.controls;
  }
  addRequest(){

  }

}
