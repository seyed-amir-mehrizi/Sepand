import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';
import { RegisterCustomerService } from './register-customer.service';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) {
    return WEEKDAYS_SHORT[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }
  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
  }
}
@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class RegisterCustomerComponent implements OnInit {
  public model: any;
  allNationalities: any = [];
  personTypeList: any = [];
  registerRealCustomerForm: FormGroup;
  registerLegalCustomerForm:FormGroup;
  registerForeignForm:FormGroup;
  isRegisterCustomerSubmitted: boolean = false;
  isRegisterLegalCustomerSubmitted: boolean = false;
  isRegisterForeignCustomerSubmitted: boolean = false;
  listOfAlphabets:any = [];
  isReal: boolean = false;
  isLegal: boolean = false;
  isForeign: boolean = false;
  isEmpty:boolean = true;
  degreeList: any = [];

  constructor(private sharedService: SharedDataService, private fb: FormBuilder
    , private service : RegisterCustomerService
    
    ) { }

  ngOnInit(): void {
    this.getPersonType();
    this.getListOfDegrees();
    this.getListOfAllAlphabet();

  }



  getListOfDegrees() {
    this.sharedService.getDegreeType()
      .subscribe((result: any) => {
        this.degreeList = result;
      })
  }
  nationalities_Serach = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),

      switchMap(searchText => (searchText.length < 2 ? [] :
        this.getAllNationalities(searchText)
      )
      )
    );
  getAllNationalities(searchText: string): Observable<any[]> {
    return this.sharedService.getNationalities(searchText).pipe(
      map((response: any) => response)
    )
  }
  // display in show box
  nationalitiesFormatter = (result: { nationalName: string }) => result.nationalName || "";

  // select in input

  nationalitiesInputFormatter = (result: { nationalName: string }) => result.nationalName || "";



  countries_Serach = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),

      switchMap(searchText => (searchText.length < 2 ? [] :
        this.getAllcountries(searchText)
      )
      )
    );
  getAllcountries(searchText: string): Observable<any[]> {
    return this.sharedService.getCountriesList(searchText).pipe(
      map((response: any) => response)
    )
  }
  // display in show box
  countriesFormatter = (result: { farsiName: string }) => result.farsiName || "";

  // select in input

  countriesInputFormatter = (result: { farsiName: string }) => result.farsiName || "";





  initRealForm() {
    this.registerRealCustomerForm = this.fb.group({
      degreeId: ['', Validators.required],
      // customerType: ['', Validators.required],
      nationalNumber: ['', Validators.required],
      firstNameFa: ['', Validators.required],
      lastNameFa: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      lastNameEn: ['', Validators.required],
      nationalityId: ['', Validators.required],
      birthLocation: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthCertificatePlaceOfIssue: ['', Validators.required],
      fatherNameFa: ['', Validators.required],
      fatherNameEn: ['', Validators.required],
      sex: ['', Validators.required],
      birthCertificateNo: ['', Validators.required],
      birthCertificateSerial: ['', Validators.required],
      birthCertificateAlphabiticNoId: ['', Validators.required],
      birthCertificateNumericNo: ['', Validators.required],
      isDisable: [''],
    })
  }
  get registerRealCustomerFormInfo() {
    return this.registerRealCustomerForm.controls;
  }

  initLegalForm(){
    this.registerLegalCustomerForm = this.fb.group({
      registerDate: ['', Validators.required],
      registerNo: ['', Validators.required],
      comNameEn: ['', Validators.required],
      comNameFa: ['', Validators.required],
      commercialCode: ['', Validators.required],
    });
  }
  get registerLegalCustomerFormInfo() {
    return this.registerLegalCustomerForm.controls;
  }
  
  initForeignForm(){
    this.registerForeignForm = this.fb.group({
      passportExpireDate: ['', Validators.required],
      comNameEn: ['', Validators.required],
      passportNo: ['', Validators.required],
      foreignPervasiveCode: ['', Validators.required],
      countryCode :  ['', Validators.required],
      rsidencyType: ['', Validators.required]
    });
  }
  get registerForeignCustomerFormInfo() {
    return this.registerForeignForm.controls;
  }
  getPersonType() {
    this.sharedService.getPersonType()
      .subscribe((result: any) => {
        this.personTypeList = result;
      })
  }

  onOptionsSelected(item: any) {
    switch (item) {
      case "1":
        this.initRealForm();
        this.isReal = true;
        this.isLegal = false;
        this.isForeign = false;
        this.isEmpty = false
        break;
      case "2":
        this.initLegalForm();
        this.isReal = false;
        this.isLegal = true;
        this.isForeign = false;
        this.isEmpty = false;

        break;
      case "3":
        this.initForeignForm();
        this.isReal = false;
        this.isLegal = false;
        this.isForeign = true;
        this.isEmpty = false
        break;
      default:
        this.isReal = false;
        this.isLegal = false;
        this.isForeign = false;
        this.isEmpty = true
        break;
    }
  }

  formatDate(date:any) {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    return year + '/' + month + '/' + day;
  }
  changeJalaliToGregorian(date:any) {
    return moment.from(this.formatDate(date), 'fa', 'YYYY/MM/DD').format(`YYYY-MM-DD`);
  }


  submitRealCustomer(item:any){
    if (this.registerRealCustomerForm.invalid) {
      this.isRegisterCustomerSubmitted = true;
      return;
    }
    const dataSending = this.registerRealCustomerForm.value;
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.nationalityId = dataSending.nationalityId.id;
    dataSending.birthCertificateAlphabiticNoId = parseInt(dataSending.birthCertificateAlphabiticNoId);
    dataSending.isLegal = true;
    console.log("dataSending : " , dataSending);
    this.service.createCustomer(dataSending)
    .subscribe((result:any)=>{
      console.log("result : " , result);
    })
  }


  getListOfAllAlphabet(){
    this.sharedService.getAllAlphabetList()
    .subscribe((result:any)=>{
      this.listOfAlphabets = result;
    })
  }


}
