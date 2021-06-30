import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { RegisterProjectInfoComponent } from './register-project-info/register-project-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { RegisterCompanyInfoComponent } from './register-company-info/register-company-info.component';
import { CompaniesPayListComponent } from './companies-pay-list/companies-pay-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { RegisterNewContractComponent } from './register-new-contract/register-new-contract.component';
import { RepresentativeContractsListComponent } from './representative-contracts-list/representative-contracts-list.component';
import { RegisterNewRepresentativeContractComponent } from './register-new-representative-contract/register-new-representative-contract.component';
import { EditProjectModalComponent } from './project-list/edit-project-modal/edit-project-modal.component';
import { EditCompanyPayListModalComponent } from './companies-pay-list/edit-company-pay-list-modal/edit-company-pay-list-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegisterProjectInfoComponent,
    ProjectListComponent,
    RegisterCompanyInfoComponent,
    CompaniesPayListComponent,
    ContractListComponent,
    RegisterNewContractComponent,
    RepresentativeContractsListComponent,
    RegisterNewRepresentativeContractComponent,
    EditProjectModalComponent,
    EditCompanyPayListModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BasicInfoRoutingModule
  ],
  exports: [
    RegisterProjectInfoComponent,
    RegisterNewRepresentativeContractComponent
  ]
})
export class BasicInfoModule { }
