import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListComponent } from './user/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestManagementModule } from './request-management/request-management.module';





@NgModule({
  declarations: [
    MainComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule,
    RequestManagementModule

  ]
})
export class MainModule { }
