import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 openById = {};

  constructor() { }

  ngOnInit(): void {
  }

  test(event){
    this.openById[event.panelId] = event.nextState;
  }

}
