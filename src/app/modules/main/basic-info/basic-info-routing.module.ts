import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProjectInfoComponent } from './register-project-info/register-project-info.component';

const routes: Routes = [
    {
      path: 'registerProject' ,
      component: RegisterProjectInfoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
