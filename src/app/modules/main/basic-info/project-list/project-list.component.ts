import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseInfoService } from '../base-info.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectList: any = [];
  constructor(private baseInfoService : BaseInfoService  , private spinner: NgxSpinnerService,) { }

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

}
