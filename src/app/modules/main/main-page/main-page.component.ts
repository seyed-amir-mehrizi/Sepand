import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToUsersList() {
    this.router.navigate(['main/userList'])
  }
  goToCustomersList() {
    this.router.navigate(['main/requestManagement/customersList'])
  }
  goToContractList() {
    this.router.navigate(['main/basicInfo/ProjectList'])
  }
  goToCompaniesPage() {
    this.router.navigate(['main/basicInfo/PspList'])
  }
  goToChangeIban(){
    this.router.navigate(['main/requestManagement/changheIban'])

  }
  goToChangeClass(){
    this.router.navigate(['main/requestManagement/changeClass'])

  }
  goToChangePostalcode(){
    this.router.navigate(['main/requestManagement/changePostalcode'])

  }
  goToRequest(){
    this.router.navigate(['main/requestManagement/requests'])

  }

}
