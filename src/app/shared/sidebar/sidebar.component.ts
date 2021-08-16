import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login/login/login.service';
import {getListOfMenu} from './listOFMenue';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 openById = {};
  userRole;
  listOfMenu:any= [];
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('r');
    this.getListOFMenue();
  }

  openPanel(event){
    console.log("event : " , event);
    
    this.openById[event.panelId] = event.nextState;
  }


  getListOFMenue(){
    this.listOfMenu = getListOfMenu();
    console.log(" this.listOfMenu : " ,  this.listOfMenu);
    
  }

}
