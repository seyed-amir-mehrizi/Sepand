import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateTerminalComponent } from './activate-terminal/activate-terminal.component';
import { ChangeClassComponent } from './change-class/change-class.component';
import { ChangePostalCodeComponent } from './change-postal-code/change-postal-code.component';
import { RemoveTerminalComponent } from './remove-terminal/remove-terminal.component';
import { RequestStatusComponent } from './request-status/request-status.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestManagementRoutingModule { }
