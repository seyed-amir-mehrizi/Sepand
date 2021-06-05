import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { RegisterProjectInfoComponent } from './register-project-info/register-project-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterProjectInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicInfoRoutingModule
  ],
  exports: [
    RegisterProjectInfoComponent
  ]
})
export class BasicInfoModule { }
