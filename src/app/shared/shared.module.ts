import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainRoutingModule } from '../modules/main/main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MainRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [SidebarComponent , NavbarComponent , FilterComponent]
})
export class SharedModule { }
