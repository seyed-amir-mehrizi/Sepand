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
    ]
  },
 
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
