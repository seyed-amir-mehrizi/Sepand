import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseInfoService } from '../base-info.service';
import { EditProjectModalComponent } from './edit-project-modal/edit-project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectList: any = [];
  constructor(private baseInfoService : BaseInfoService  , private spinner: NgxSpinnerService,
    private ngbModal: NgbModal, 
    
    ) { }

  ngOnInit(): void {
    this.getListOfPorjects();
  }

  getListOfPorjects() {
    this.spinner.show();
    this.baseInfoService.getListOfProjects()
      .subscribe(res => {
        this.spinner.hide();
        this.projectList = res;
    })
  }

  onEditModalOpen(item){
    const modalRef = this.ngbModal.open(EditProjectModalComponent, { size: 'xl', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.projectInfo = item;
    modalRef.result.then(() => {
      this.getListOfPorjects();
    },()=>{
      
    });
  }

}
