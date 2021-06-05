import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activate-terminal',
  templateUrl: './activate-terminal.component.html',
  styleUrls: ['./activate-terminal.component.css']
})
export class ActivateTerminalComponent implements OnInit {

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
