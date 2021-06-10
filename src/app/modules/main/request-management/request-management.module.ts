import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestManagementRoutingModule } from './request-management-routing.module';
import { RequestStatusComponent } from './request-status/request-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeClassComponent } from './change-class/change-class.component';
import { ChangePostalCodeComponent } from './change-postal-code/change-postal-code.component';
import { RemoveTerminalComponent } from './remove-terminal/remove-terminal.component';
import { ActivateTerminalComponent } from './activate-terminal/activate-terminal.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ChangeClassModalComponent } from './change-class-modal/change-class-modal.component';


@NgModule({
  declarations: [
    RequestStatusComponent,
    ChangeClassComponent,
    ChangePostalCodeComponent,
    RemoveTerminalComponent,
    ActivateTerminalComponent,
    RegisterCustomerComponent,
    CustomerListComponent,
    ChangeClassModalComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestManagementRoutingModule,
    NgSelectModule,

    

  ],
  exports: [RequestStatusComponent,RegisterCustomerComponent]
})
export class RequestManagementModule { }
