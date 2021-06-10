import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-change-postal-code-modal',
  templateUrl: './change-postal-code-modal.component.html',
  styleUrls: ['./change-postal-code-modal.component.css']
})
export class ChangePostalCodeModalComponent implements OnInit {
  @Input() postalCodeInfo;
  editPostalcodeForm: FormGroup;
  isPostalcodeSubmitted: boolean = false;
  constructor(private sharedService: SharedDataService,
    private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private customerService: CustomersService

  ) { }
  ngOnInit(): void {
    this.initLoginform();
    this.setValueForPostalCode();
  }
  initLoginform() {
    this.editPostalcodeForm = this.fb.group({
      shopPostalCode: ['', Validators.required],
    });
  }
  get changePostalCodeFormInfo() {
    return this.editPostalcodeForm.controls;
  }

  setValueForPostalCode() {
    this.editPostalcodeForm.setValue({
      shopPostalCode: this.postalCodeInfo.shopPostalCode
    })
  }

  editPostalcode(item) {
    if(this.editPostalcodeForm.invalid){
      this.isPostalcodeSubmitted = true;
      return;
    }
    let data = {
      customerId: this.postalCodeInfo.id,
      shopPostalCode: this.editPostalcodeForm.value.shopPostalCode
    }
    this.customerService.editPostalCode(data)
      .subscribe((res => {
        this.ngbActiveModal.close();
      }));
  }

}
