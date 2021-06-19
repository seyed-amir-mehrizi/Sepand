import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateTerminalComponent } from './activate-terminal/activate-terminal.component';
import { ChangeClassComponent } from './change-class/change-class.component';
import { ChangeIbanComponent } from './change-iban/change-iban.component';
import { ChangePostalCodeComponent } from './change-postal-code/change-postal-code.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RemoveTerminalComponent } from './remove-terminal/remove-terminal.component';
import { RequestStatusComponent } from './request-status/request-status.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: 'status' ,
    component: RequestStatusComponent
  },
  {
    path: 'changeClass' ,
    component: ChangeClassComponent
  },
  {
    path: 'changePostalcode' ,
    component: ChangePostalCodeComponent
  },
  {
    path: 'removeTerminal' ,
    component: RemoveTerminalComponent
  }
  ,
  {
    path: 'activateTerminal' ,
    component: ActivateTerminalComponent
  },
  {
    path: 'registerCustomer' ,
    component: RegisterCustomerComponent
  }
  ,
  {
    path: 'customersList' ,
    component: CustomerListComponent
  }  ,
  {
    path: 'changheIban' ,
    component: ChangeIbanComponent
  },
  {
    path: 'requests' ,
    component: RequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestManagementRoutingModule { }
