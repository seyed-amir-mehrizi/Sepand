import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-class-modal',
  templateUrl: './change-class-modal.component.html',
  styleUrls: ['./change-class-modal.component.css']
})
export class ChangeClassModalComponent implements OnInit {

  @Input() classInfo;
  listOfGuild: any = [];
  editGuildForm: FormGroup;
  isGuildSubmitted: boolean = false;
  constructor(private sharedService: SharedDataService,
    private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private customerService: CustomersService

  ) { }

  ngOnInit(): void {
    this.getListOFGuilds();
    this.initLoginform();
    this.setValueForGuild();

  }

  initLoginform() {
    this.editGuildForm = this.fb.group({
      guildId: ['', Validators.required],
    });
  }
  get changeGuildFormInfo() {
    return this.editGuildForm.controls;
  }


  getListOFGuilds() {
    this.sharedService.getAllGuildsCategories()
      .subscribe((res => {
        console.log(res);
        this.listOfGuild = res;

      }))
  }


  setValueForGuild() {
    this.editGuildForm.setValue({
      guildId: this.classInfo.guildId
    })
  }


  editGuild(item) {

    let data = {
      customerId: this.classInfo.id,
      guildId: parseInt(this.editGuildForm.value.guildId)
    }

    this.customerService.editGuild(data)
      .subscribe((res => {
        this.ngbActiveModal.close();
      }));
  }



}
