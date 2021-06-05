import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-remove-terminal',
  templateUrl: './remove-terminal.component.html',
  styleUrls: ['./remove-terminal.component.css']
})
export class RemoveTerminalComponent implements OnInit {


  addActivateTerminalForm!: FormGroup;
  isActivateTerminalFormSubmitted = false;
  constructor(

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }
  initFormBuilder() {
    this.addActivateTerminalForm = this.fb.group({
      customerNo: ['', Validators.required],
      companyPayCode: ['', Validators.required],
    });
  }

  get activateTerminalFormInfo() {
    return this.addActivateTerminalForm.controls;
  }
  addRequest(){

  }

}
