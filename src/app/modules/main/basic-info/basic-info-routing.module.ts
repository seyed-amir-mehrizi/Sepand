import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesPayListComponent } from './companies-pay-list/companies-pay-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RegisterNewContractComponent } from './register-new-contract/register-new-contract.component';
import { RegisterNewRepresentativeContractComponent } from './register-new-representative-contract/register-new-representative-contract.component';
import { RegisterProjectInfoComponent } from './register-project-info/register-project-info.component';
import { RepresentativeContractsListComponent } from './representative-contracts-list/representative-contracts-list.component';

const routes: Routes = [
    {
      path: 'registerProject' ,
      component: RegisterProjectInfoComponent
    },
    {
      path: 'MarketerContractAdd' ,
      component: RegisterNewRepresentativeContractComponent
    },
    {
      path: 'MarketerContractList' ,
      component: RepresentativeContractsListComponent
    },
    {
      path: 'addNewContract' ,
      component: RegisterNewContractComponent
    },
    {
      path: 'ContractList' ,
      component: ContractListComponent
    },
    {
      path: 'PspList' ,
      component: CompaniesPayListComponent
    },
    {
      path: 'ProjectList' ,
      component: ProjectListComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
