import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';



const routes: Routes = [
  {
    path:'' ,component:MainComponent ,
    children : [
      {
        path:'userList' ,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path:'requestManagement' ,
        loadChildren: () => import('./request-management/request-management.module').then(m => m.RequestManagementModule)
      },
      {
        path:'basicInfo' ,
        loadChildren: () => import('./basic-info/basic-info.module').then(m => m.BasicInfoModule)
      },
    ]
  },
 
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
