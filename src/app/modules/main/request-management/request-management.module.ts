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
import { ChangePostalCodeModalComponent } from './change-postal-code-modal/change-postal-code-modal.component';
import { ChangeIbanComponent } from './change-iban/change-iban.component';
import { ChangeIbanModalComponent } from './change-iban-modal/change-iban-modal.component';
import { RequestsComponent } from './requests/requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditModalRequestComponent } from './requests/edit-modal-request/edit-modal-request.component';
import { ActiveTerminalModalComponent } from './activate-terminal/active-terminal-modal/active-terminal-modal.component';
import { RemoveTerminalModalComponent } from './remove-terminal/remove-terminal-modal/remove-terminal-modal.component';
import { SendingDocumentsComponent } from './sending-documents/sending-documents.component';
import { SendingDocumentsModalComponent } from './sending-documents-modal/sending-documents-modal.component';
import { CustomerListInfoModalComponent } from './customer-list/customer-list-info-modal/customer-list-info-modal.component';


@NgModule({
  declarations: [
    RequestStatusComponent,
    ChangeClassComponent,
    ChangePostalCodeComponent,
    RemoveTerminalComponent,
    ActivateTerminalComponent,
    RegisterCustomerComponent,
    CustomerListComponent,
    ChangeClassModalComponent,
    ChangePostalCodeModalComponent,
    ChangeIbanComponent,
    ChangeIbanModalComponent,
    RequestsComponent,
    EditModalRequestComponent,
    ActiveTerminalModalComponent,
    RemoveTerminalModalComponent,
    SendingDocumentsComponent,
    SendingDocumentsModalComponent,
    CustomerListInfoModalComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RequestManagementRoutingModule,
    NgSelectModule,

    

  ],
  exports: [RequestStatusComponent,RegisterCustomerComponent]
})
export class RequestManagementModule { }
