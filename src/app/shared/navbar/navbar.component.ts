import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentDay;
  constructor() { }
  

  ngOnInit(): void {
    this.displayToday(); 
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('r');
    window.location.href = '/';
  }

  displayToday() {
    const faDateTime = new Intl.DateTimeFormat("fa", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format;
    const now = Date.now();
    this.currentDay = faDateTime(now);
  }



}
