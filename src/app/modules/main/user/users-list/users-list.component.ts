import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(

    private ngbModal: NgbModal,

  ) { }

  ngOnInit(): void {
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

}
