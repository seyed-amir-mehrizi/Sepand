import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/modules/login/login/login.service';
import { TransferRole } from 'src/app/shared/service/transfer-role.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  userList: any = [];
  userRole;
  constructor(

    private ngbModal: NgbModal,
    private service: UserService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private roleService: TransferRole

  ) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('r') ;
    this.getListOfUsers();

  }

  getListOfUsers(){
    this.spinner.show();
    this.service.getUserList()
    .subscribe((result: any) => {
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

  changeUserStatus(item: any){
    const data = {username : item.username};
    if (item.isActive){
      this.service.lockUser(data)
      .subscribe((result: any) => {
        this.getListOfUsers();
      });
    }else{
      this.service.unlockUser(data)
      .subscribe((result: any) => {
        this.getListOfUsers();
      });
    }
  }




}
