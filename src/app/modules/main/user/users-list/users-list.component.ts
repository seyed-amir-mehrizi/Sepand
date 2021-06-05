import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private service : UserService

  ) { }

  ngOnInit(): void {
    this.getListOfUsers();
  }

  getListOfUsers(){
    this.service.getUserList()
    .subscribe((result:any)=>{
      this.userList = result;
    });
  }

  onOpenModalClick(){
    const modalRef = this.ngbModal.open(AddUserComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    // modalRef.componentInstance.newsInfo = news;
    // modalRef.componentInstance.isAdd = isAdd;
    modalRef.result.then(() => {
      // this.getNewsList(this.command);
    }, () => {
    });
  }

  changePasswordOpen(item: any){
    const modalRef = this.ngbModal.open(ChangePasswordModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.userInfo = item;
  }

}
