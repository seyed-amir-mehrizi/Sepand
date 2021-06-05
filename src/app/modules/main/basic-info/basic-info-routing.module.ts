import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewRepresentativeContractComponent } from './register-new-representative-contract/register-new-representative-contract.component';
import { RegisterProjectInfoComponent } from './register-project-info/register-project-info.component';

const routes: Routes = [
    {
      path: 'registerProject' ,
      component: RegisterProjectInfoComponent
    },
    {
      path: 'MarketerContractAdd' ,
      component: RegisterNewRepresentativeContractComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
