import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestManagementRoutingModule } from './request-management-routing.module';
import { RequestStatusComponent } from './request-status/request-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeClassComponent } from './change-class/change-class.component';
import { ChangePostalCodeComponent } from './change-postal-code/change-postal-code.component';
import { RemoveTerminalComponent } from './remove-terminal/remove-terminal.component';
import { ActivateTerminalComponent } from './activate-terminal/activate-terminal.component';


@NgModule({
  declarations: [
    RequestStatusComponent,
    ChangeClassComponent,
    ChangePostalCodeComponent,
    RemoveTerminalComponent,
    ActivateTerminalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestManagementRoutingModule
  ],
  exports: [RequestStatusComponent]
})
export class RequestManagementModule { }
