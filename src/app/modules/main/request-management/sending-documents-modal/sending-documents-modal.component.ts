import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-sending-documents-modal',
  templateUrl: './sending-documents-modal.component.html',
  styleUrls: ['./sending-documents-modal.component.css']
})
export class SendingDocumentsModalComponent implements OnInit {
  @Input() rowInfo;
  uploadDocumentForm:FormGroup;
  isUploadDocumentSubmitted:boolean = false;
  listOfAllDocuments:any = [];
  image;
  constructor(private sharedDataService : SharedDataService ,     private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal, private customerService : CustomersService) { }

  ngOnInit(): void {
    console.log("rowInfo : " , this.rowInfo);
    this.getListOfAllDocuments();
    this.initUploadform();
    
  }
  initUploadform() {
    this.uploadDocumentForm = this.fb.group({
      DocTypeId: ['', Validators.required],
      FormFile: ['', Validators.required],

    });
  }

  get uploadDocumentsFormInfo() {
    return this.uploadDocumentForm.controls;
  }

  getListOfAllDocuments(){
    this.sharedDataService.getAllDocumentType()
    .subscribe(res=>{
      this.listOfAllDocuments = res;
      
    })
  }

  changeListener($event): void {
    this.readThis($event.target);

  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    // var formData = new FormData();
    // formData.append("postData",file );
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.uploadDocumentForm.patchValue({
        FormFile: file
      });
    }
    myReader.readAsDataURL(file);
  }


  uploadDocument(item){
    if (this.uploadDocumentForm.invalid) {
      this.isUploadDocumentSubmitted = true;
      return;
    }
    const dataSending = this.uploadDocumentForm.value;
    dataSending.CustomerId = parseInt(this.rowInfo.id);
    dataSending.DocTypeId = parseInt(dataSending.DocTypeId);
    console.log("dataSending : " , dataSending);
    this.customerService.uploadDocument(dataSending)
    .subscribe((res=>{
      this.ngbActiveModal.close();
    }))
    

  }

}
