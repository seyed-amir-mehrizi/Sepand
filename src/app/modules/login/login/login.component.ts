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
  currentYear;

  constructor(
    private fb: FormBuilder ,
    private service: LoginService
  ) { }

  ngOnInit(): void {
    this.initLoginform();
    this.displayToday();
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
        window.location.href = '/main/mainPage';
      }
    });
  }

  displayToday() {
    const faDateTime = new Intl.DateTimeFormat('fa', {
      year: 'numeric',
    }).format;
    const now = Date.now();
    this.currentYear = faDateTime(now);
  }

}
