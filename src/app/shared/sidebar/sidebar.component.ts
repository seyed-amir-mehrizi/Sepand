import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 openById = {};
  userRole;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('r') ;
    console.log("this.userRole : " , this.userRole);
    
  }

  test(event){
    this.openById[event.panelId] = event.nextState;
  }

}
