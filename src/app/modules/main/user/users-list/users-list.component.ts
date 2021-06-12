import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUserComponent } from '../add-user/add-user.component';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  userList:any= [];

  constructor(

    private ngbModal: NgbModal,
    private service : UserService,
    private spinner: NgxSpinnerService
    

  ) { }

  ngOnInit(): void {
    this.getListOfUsers();
  }

  getListOfUsers(){
    this.spinner.show();
    this.service.getUserList()
    .subscribe((result:any)=>{
      this.userList = result;
      this.spinner.hide();
    });
  }

  addUser(){
    const modalRef = this.ngbModal.open(AddUserComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.result.then(() => {
      this.getListOfUsers();
    }, () => {
    });
  }

  changePasswordOpen(item: any){
    const modalRef = this.ngbModal.open(ChangePasswordModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.userInfo = item;
  }

  changeUserStatus(item:any){
    let data = {username : item.username};
    if(item.isActive){
      this.service.lockUser(data)
      .subscribe((result:any)=>{
        this.getListOfUsers();
      });
    }else{
      this.service.unlockUser(data)
      .subscribe((result:any)=>{
        this.getListOfUsers();
      });
    }
  }

}
