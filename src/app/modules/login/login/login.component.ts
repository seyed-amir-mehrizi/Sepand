import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginClicked = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder ,
    private service: LoginService
  ) { }

  ngOnInit(): void {
    this.initLoginform();
  }

  initLoginform(){
    this.loginForm = this.fb.group({
      username : ['' , Validators.required],
      password : ['' , Validators.required]
    });
  }
  get loginFromSubmitted(){
    return this.loginForm.controls;
  }
  signIn(credential: any){
    if (this.loginForm.invalid) {
      this.isLoginClicked = true;
      return;
    }
    this.service.login(credential)
    .subscribe((result: any) => {
      if (result){
        window.location.href = '/main';
      }
    });
  }

}
