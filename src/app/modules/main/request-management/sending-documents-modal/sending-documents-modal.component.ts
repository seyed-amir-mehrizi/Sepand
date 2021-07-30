import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { CustomersService } from '../customer-list/customers.service';

@Component({
  selector: 'app-sending-documents-modal',
  templateUrl: './sending-documents-modal.component.html',
  styleUrls: ['./sending-documents-modal.component.css']
})
export class SendingDocumentsModalComponent implements OnInit {
  @Input() rowInfo;
  uploadDocumentForm: FormGroup;
  isUploadDocumentSubmitted: boolean = false;
  listOfAllDocuments: any = [];
  listOfAllUploadedDocument: any = [];

  image;
  blob;
  constructor(private sharedDataService: SharedDataService, private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public ngbActiveModal: NgbActiveModal, private customerService: CustomersService,) { }

  ngOnInit(): void {
    this.getListOfAllDocuments();
    this.initUploadform();
    this.getListOfCustomerDocument();

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

  getListOfAllDocuments() {
    this.sharedDataService.getAllDocumentType()
      .subscribe(res => {
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


  uploadDocument(item) {
    if (this.uploadDocumentForm.invalid) {
      this.isUploadDocumentSubmitted = true;
      return;
    }
    this.spinner.show();
    const dataSending = this.uploadDocumentForm.value;
    dataSending.CustomerId = parseInt(this.rowInfo.id);
    dataSending.DocTypeId = parseInt(dataSending.DocTypeId);
    this.customerService.uploadDocument(dataSending)
      .subscribe((res => {
        this.getListOfCustomerDocument();
        this.spinner.hide();

        // this.ngbActiveModal.close();
      }))
  }

  getListOfCustomerDocument() {
    let data = {
      customerId: parseInt(this.rowInfo.id),
    }
    this.customerService.getListOfUploadedDocument(data)
      .subscribe(res => {
        this.listOfAllUploadedDocument = res;
      });
  }

  downloadDocument(item) {
    let data = {
      id: parseInt(item.id),
    }
    this.spinner.show();
    this.customerService.downloadDocument(data)
      .subscribe((res: any) => {
        this.blob = new Blob([res], { type: 'image/jpeg' });
        var downloadURL = window.URL.createObjectURL(res);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "image.jpeg";
        link.click();
        this.spinner.hide();

      });
  }



}
