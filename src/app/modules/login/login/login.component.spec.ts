import { FormBuilder } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";
import { HttpClient } from '@angular/common/http';



describe('login form component', () => {

  let component: LoginComponent
  beforeEach(() => {
    component = new LoginComponent(new FormBuilder(), null);
  });

  it('should create login form with 2 controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });
  it('should make username and email control required', () => {

    let usernameControl = component.loginForm.get('username');
    usernameControl.setValue('');
    expect(usernameControl.valid).toBeFalsy();
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalsy();

  })



})