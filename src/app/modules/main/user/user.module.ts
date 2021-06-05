import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';


@NgModule({
  declarations: [
    AddUserComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
