import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';
import { RegisterCustomerService } from './register-customer.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseInfoService } from '../../basic-info/base-info.service';
import { ChangeDetectorRef } from '@angular/core';

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

  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class RegisterCustomerComponent implements OnInit {
  active;
  disabled = true;
  public model: any;
  public image: any;

  allNationalities: any = [];
  personTypeList: any = [];
  registerRealCustomerForm: FormGroup;
  registerLegalCustomerForm: FormGroup;
  registerForeignForm: FormGroup;
  LocationInfoForm: FormGroup;
  BankInfoForm:FormGroup;
  contractFormInfo:FormGroup;
  isRegisterCustomerSubmitted: boolean = false;
  isRegisterLegalCustomerSubmitted: boolean = false;
  isRegisterForeignCustomerSubmitted: boolean = false;
  isLocationInfoFormSubmitted: boolean = false;
  isBankInfoFormSubmitted: boolean = false;
  isContractInfoFormSubmitted: boolean = false;
  listOfAlphabets: any = [];
  proviceList: any = [];
  isReal: boolean = false;
  isLegal: boolean = false;
  isForeign: boolean = false;
  isEmpty: boolean = true;
  hasAmount:boolean = false;
  degreeList: any = [];
  guildList: any = [];
  fileToUpload: File = null;
  proviceCitiesList: any = [];
  sharedTypeList: any = [];
  BankInfoList: any = [];
  isProject:boolean = false;
  sharedTypeId:number;
  isChangePasswordSubmitted: boolean = false;
  customerType: number;
  hasNationalNumber: boolean = false;
  hasRegisterNumber: boolean = false;
  hasForeignNumber: boolean = false;
  hasPercentage : boolean = false;
  customerTypeValue;
  registerRealCustomerFormValue: any = {};
  registerLegalCustomerFormValue: any = {};
  registerForeignCustomerFormValue: any = {};
  locationInfoValue: any = {};
  contractInfoValue: any = {};
  listOfProject:any = [];
  imageUrl: any;
  disabledLocationInfo: boolean = true;
  disabledBankInfo: boolean = true;
  disabledContractInfo: boolean = true;
  provinceId: number;
  constructor(
    private sharedService: SharedDataService,
    private fb: FormBuilder,
    private service: RegisterCustomerService,
    private toastr: ToastrService,
    private baseInfoService: BaseInfoService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.getPersonType();
    this.getListOfDegrees();
    this.getListOfAllAlphabet();
    this.initLocationInfoForm();
    this.getListOfProvince();
    this.getListOfGuild();
    this.initBankInfoForm();
    this.getListOfSharedTypes();
    this.initContractInfo();
    this.getAllProjects();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.customerTypeValue = localStorage.getItem('item');

    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  goToNext(nav) {
    nav.select(2);
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }
  getListOfDegrees() {
    this.sharedService.getDegreeType().subscribe((result: any) => {
      this.degreeList = result;
    });
  }
  nationalities_Serach = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),

      switchMap((searchText) =>
        searchText.length < 2 ? [] : this.getAllNationalities(searchText)
      )
    );
  getAllNationalities(searchText: string): Observable<any[]> {
    return this.sharedService
      .getNationalities(searchText)
      .pipe(map((response: any) => response));
  }
  // display in show box
  nationalitiesFormatter = (result: { nationalName: string }) =>
    result.nationalName || '';

  // select in input

  nationalitiesInputFormatter = (result: { nationalName: string }) =>
    result.nationalName || '';

  countries_Serach = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),

      switchMap((searchText) =>
        searchText.length < 2 ? [] : this.getAllcountries(searchText)
      )
    );
  getAllcountries(searchText: string): Observable<any[]> {
    return this.sharedService
      .getCountriesList(searchText)
      .pipe(map((response: any) => response));
  }
  // display in show box
  countriesFormatter = (result: { farsiName: string }) =>
    result.farsiName || '';

  // select in input

  countriesInputFormatter = (result: { farsiName: string }) =>
    result.farsiName || '';

  initRealForm() {
    this.registerRealCustomerForm = this.fb.group({
      degreeId: ['', Validators.required],
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
      postalCode: ['', Validators.required],
      isDisable: [''],
    });
  }
  get registerRealCustomerFormInfo() {
    return this.registerRealCustomerForm.controls;
  }

  submitRealCustomer(nav: any) {
    if (this.registerRealCustomerForm.invalid) {
      this.isRegisterCustomerSubmitted = true;
      return;
    } else if (this.hasNationalNumber === false) {
      this.toastr.error('در ابتدا استعلام کد ملی خود را بررسی کنید');
      return;
    }
    const dataSending = this.registerRealCustomerForm.value;
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.nationalityId = parseInt(dataSending.nationalityId['id']);
    dataSending.sex = parseInt(dataSending.sex);
    dataSending.birthCertificateNo = parseInt(dataSending.birthCertificateNo);
    dataSending.birthCertificateSerial = parseInt(
      dataSending.birthCertificateSerial
    );
    dataSending.birthCertificateAlphabiticNoId = parseInt(
      dataSending.birthCertificateAlphabiticNoId
    );
    dataSending.birthCertificateNumericNo = parseInt(
      dataSending.birthCertificateNumericNo
    );
    dataSending.degreeId = parseInt(dataSending.degreeId);
    this.registerRealCustomerFormValue = dataSending;
    nav.select(2);
    this.disabledLocationInfo = false;
  }

  getPersonType() {
    this.sharedService.getPersonType().subscribe((result: any) => {
      this.personTypeList = result;
    });
  }

  onOptionsSelected(item: any) {
    this.customerType = item;
    localStorage.setItem('item', item);
    switch (item) {
      case '1':
        this.initRealForm();
        this.isReal = true;
        this.isLegal = false;
        this.isForeign = false;
        this.isEmpty = false;
        break;
      case '2':
        this.initLegalForm();
        this.isReal = false;
        this.isLegal = true;
        this.isForeign = false;
        this.isEmpty = false;

        break;
      case '3':
        this.initForeignForm();
        this.isReal = false;
        this.isLegal = false;
        this.isForeign = true;
        this.isEmpty = false;
        break;
      default:
        this.isReal = false;
        this.isLegal = false;
        this.isForeign = false;
        this.isEmpty = true;
        break;
    }
  }

  formatDate(date: any) {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    return year + '/' + month + '/' + day;
  }
  changeJalaliToGregorian(date: any) {
    return moment
      .from(this.formatDate(date), 'fa', 'YYYY/MM/DD')
      .format(`YYYY-MM-DD`);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  splitGregorianToJalaliDate(date) {
    return moment(date, 'YYYY/MM/DD')
      .locale('fa')
      .format(`YYYY-MM-DD`)
      .split('-');
  }
  checkNationalNumber() {
    const dataSending = this.registerRealCustomerForm.value;
    if (dataSending.nationalNumber) {
      let data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.nationalNumber,
      };
      this.hasNationalNumber = true;
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.registerRealCustomerForm.setValue({
            degreeId: res.degreeId,
            nationalNumber: res.nationalNumber,
            firstNameFa: res.firstNameFa,
            lastNameFa: res.lastNameFa,
            firstNameEn: res.firstNameEn,
            lastNameEn: res.lastNameEn,
            nationalityId: [{ id: res.nationalityId, nationalName: 'ایران' }],
            birthLocation: res.birthLocation,
            birthDate: {
              year: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[0]),
              month: parseInt(
                this.splitGregorianToJalaliDate(res.birthDate)[1]
              ),
              day: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[2]),
            },
            birthCertificatePlaceOfIssue: res.birthCertificatePlaceOfIssue,
            fatherNameFa: res.fatherNameFa,
            fatherNameEn: res.fatherNameEn,
            sex: res.sex,
            birthCertificateNo: res.birthCertificateNo,
            birthCertificateSerial: res.birthCertificateSerial,
            birthCertificateAlphabiticNoId: res.birthCertificateAlphabiticNoId,
            birthCertificateNumericNo: res.birthCertificateNumericNo,
            postalCode: res.postalCode,
            isDisable: res.isDisable,
          });
        }
      });
    } else {
      this.toastr.error('ابتدا کد ملی خود را وارد کنید...');
    }
  }

  //  check legal customer

  initLegalForm() {
    this.registerLegalCustomerForm = this.fb.group({
      firstNameFa: ['', Validators.required],
      registerNo: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      registerDate: ['', Validators.required],
      comNameEn: ['', Validators.required],
      comNameFa: ['', Validators.required],
      commercialCode: ['', Validators.required],
      degreeId: ['', Validators.required],
      nationalNumber: ['', Validators.required],
      lastNameFa: ['', Validators.required],
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
      postalCode: ['', Validators.required],
      nationalLegalCode: ['', Validators.required],
      isDisable: [''],
    });
  }
  get registerLegalCustomerFormInfo() {
    return this.registerLegalCustomerForm.controls;
  }

  checkRegisterNumber() {
    const dataSending = this.registerLegalCustomerForm.value;
    if (dataSending.registerNo) {
      let data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.registerNo,
      };
      this.hasRegisterNumber = true;
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.registerLegalCustomerForm.setValue({
            degreeId: res.degreeId,
            nationalNumber: res.nationalNumber,
            firstNameFa: res.firstNameFa,
            lastNameFa: res.lastNameFa,
            firstNameEn: res.firstNameEn,
            lastNameEn: res.lastNameEn,
            nationalityId: [{ id: res.nationalityId, nationalName: 'ایران' }],
            birthLocation: res.birthLocation,
            birthDate: {
              year: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[0]),
              month: parseInt(
                this.splitGregorianToJalaliDate(res.birthDate)[1]
              ),
              day: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[2]),
            },
            birthCertificatePlaceOfIssue: res.birthCertificatePlaceOfIssue,
            fatherNameFa: res.fatherNameFa,
            fatherNameEn: res.fatherNameEn,
            sex: res.sex,
            birthCertificateNo: res.birthCertificateNo,
            birthCertificateSerial: res.birthCertificateSerial,
            birthCertificateAlphabiticNoId: res.birthCertificateAlphabiticNoId,
            birthCertificateNumericNo: res.birthCertificateNumericNo,
            postalCode: res.postalCode,
            isDisable: res.isDisable,
            registerDate: {
              year: parseInt(
                this.splitGregorianToJalaliDate(res.registerDate)[0]
              ),
              month: parseInt(
                this.splitGregorianToJalaliDate(res.registerDate)[1]
              ),
              day: parseInt(
                this.splitGregorianToJalaliDate(res.registerDate)[2]
              ),
            },
            registerNo: res.registerNo,
            comNameEn: res.comNameEn,
            comNameFa: res.comNameFa,
            nationalLegalCod: res.nationalLegalCod,
            commercialCode: res.commercialCode,
            nationalLegalCode: res.nationalLegalCode,
          });
        }
      });
    } else {
      this.toastr.error('ابتدا شماره ثبت خود را وارد کنید...');
    }
  }

  submitLegalCustomer(nav: any) {
    if (this.registerLegalCustomerForm.invalid) {
      this.isRegisterLegalCustomerSubmitted = true;
      return;
    } else if (this.hasRegisterNumber === false) {
      this.toastr.error('در ابتدا استعلام شماره ثبت شرکت را بررسی کنید');
      return;
    }
    const dataSending = this.registerLegalCustomerForm.value;
    dataSending.registerDate = this.changeJalaliToGregorian(
      dataSending.registerDate
    );
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.nationalityId = parseInt(dataSending.nationalityId['id']);
    dataSending.sex = parseInt(dataSending.sex);
    dataSending.birthCertificateNo = parseInt(dataSending.birthCertificateNo);
    dataSending.birthCertificateSerial = parseInt(
      dataSending.birthCertificateSerial
    );
    dataSending.birthCertificateAlphabiticNoId = parseInt(
      dataSending.birthCertificateAlphabiticNoId
    );
    dataSending.birthCertificateNumericNo = parseInt(
      dataSending.birthCertificateNumericNo
    );
    dataSending.degreeId = parseInt(dataSending.degreeId);
    dataSending.isLegal = true;
    this.registerLegalCustomerFormValue = dataSending;
    nav.select(2);
    this.disabledLocationInfo = false;
  }

  checkForeignPervasiveCode() {
    const dataSending = this.registerForeignForm.value;
    if (dataSending.foreignPervasiveCode) {
      let data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.foreignPervasiveCode,
      };
      this.hasForeignNumber = true;
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.registerForeignForm.setValue({
            degreeId: res.degreeId,
            nationalNumber: res.nationalNumber,
            firstNameFa: res.firstNameFa,
            lastNameFa: res.lastNameFa,
            firstNameEn: res.firstNameEn,
            lastNameEn: res.lastNameEn,
            nationalityId: [{ id: res.nationalityId, nationalName: 'ایران' }],
            birthLocation: res.birthLocation,
            birthDate: {
              year: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[0]),
              month: parseInt(
                this.splitGregorianToJalaliDate(res.birthDate)[1]
              ),
              day: parseInt(this.splitGregorianToJalaliDate(res.birthDate)[2]),
            },
            fatherNameFa: res.fatherNameFa,
            fatherNameEn: res.fatherNameEn,
            sex: res.sex,
            postalCode: res.postalCode,
            passportExpireDate: {
              year: parseInt(
                this.splitGregorianToJalaliDate(res.passportExpireDate)[0]
              ),
              month: parseInt(
                this.splitGregorianToJalaliDate(res.passportExpireDate)[1]
              ),
              day: parseInt(
                this.splitGregorianToJalaliDate(res.passportExpireDate)[2]
              ),
            },
            commercialCode: res.commercialCode,
            foreignPervasiveCode: res.foreignPervasiveCode,
            passportNo: res.passportNo,
          });
        }
      });
    } else {
      this.toastr.error('ابتدا شماره ثبت خود را وارد کنید...');
    }
  }

  submitForeignCustomer(nav: any) {
    if (this.registerForeignForm.invalid) {
      this.isRegisterForeignCustomerSubmitted = true;
      return;
    } else if (this.hasForeignNumber === false) {
      this.toastr.error('در ابتدا استعلام شماره اتباع را بررسی کنید');
      return;
    }
    const dataSending = this.registerForeignForm.value;
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.passportExpireDate = this.changeJalaliToGregorian(
      dataSending.passportExpireDate
    );
    dataSending.nationalityId = parseInt(dataSending.nationalityId['id']);
    dataSending.countryCode = parseInt(dataSending.countryCode['id']);
    dataSending.sex = parseInt(dataSending.sex);
    dataSending.degreeId = parseInt(dataSending.degreeId);
    dataSending.rsidencyType = true;
    dataSending.vitalStatus = true;
    this.registerForeignCustomerFormValue = dataSending;
    nav.select(2);
  }

  initForeignForm() {
    this.registerForeignForm = this.fb.group({
      passportExpireDate: ['', Validators.required],
      passportNo: ['', Validators.required],
      foreignPervasiveCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      firstNameFa: ['', Validators.required],
      lastNameFa: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      lastNameEn: ['', Validators.required],
      nationalityId: ['', Validators.required],
      birthLocation: ['', Validators.required],
      birthDate: ['', Validators.required],
      fatherNameFa: ['', Validators.required],
      fatherNameEn: ['', Validators.required],
      sex: ['', Validators.required],
      degreeId: ['', Validators.required],
      commercialCode: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }
  get registerForeignCustomerFormInfo() {
    return this.registerForeignForm.controls;
  }

  initLocationInfoForm() {
    this.LocationInfoForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
      addressFa: ['', Validators.required],
      addressEn: ['', Validators.required],
      shopPostalCode: ['', Validators.required],
      shopFaxNumber: ['', Validators.required],
      shopTelephoneNumber: ['', Validators.required],
      shopCityPreCode: ['', Validators.required],
      shopBusinessLicenseNumber: ['', Validators.required],
      shopBusinessLicenseIssueDate: ['', Validators.required],
      shopBusinessLicenseExpireDate: ['', Validators.required],
      shopEmail: ['', [Validators.required , Validators.email]],
      shopAddress: ['', Validators.required],
      redirectUrl: ['', Validators.required],
      guildId: ['', Validators.required],
      shopLogo: ['', Validators.required],
      shopNameFa: ['', Validators.required],
      shopNameEn: ['', Validators.required],
      webSiteAddress: ['', Validators.required],
      provinceAbbreviation: ['', Validators.required],
      countryAbbreviation: ['', Validators.required],
      cityCode: ['', Validators.required],
      taxPayerCode: ['', Validators.required],
      isSharedAccount: [false],
      isMultiAccount: [false],
    });
  }

  get locationInfoFormInfo() {
    return this.LocationInfoForm.controls;
  }
  onProvinceSelected(value: any) {
    this.provinceId = parseInt(value.value.provinceAbbreviation);
    this.getListOfProvinceCities();
  }

  getListOfAllAlphabet() {
    this.sharedService.getAllAlphabetList().subscribe((result: any) => {
      this.listOfAlphabets = result;
    });
  }

  getListOfGuild() {
    this.sharedService.getAllGuildsCategories().subscribe((res: any) => {
      this.guildList = res;
    });
  }
  getListOfProvince() {
    this.sharedService.getAllProvince().subscribe((res: any) => {
      this.proviceList = res;
    });
  }
  getListOfProvinceCities() {
    this.sharedService
      .getCitiesOfProvince(this.provinceId)
      .subscribe((res: any) => {
        this.proviceCitiesList = res;
      });
  }
  getListOfSharedTypes() {
    this.sharedService
      .getSharedTypeCategories()
      .subscribe((res: any) => {
        this.sharedTypeList = res;
      });
  }



  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.LocationInfoForm.patchValue({
        shopLogo: myReader.result
      });
    }
    myReader.readAsDataURL(file);
    
  }

  submitLocationInfo(nav: any) {
    if (this.LocationInfoForm.invalid) {
      this.isLocationInfoFormSubmitted = true;
      return;
    }
    const dataSending = this.LocationInfoForm.value;
    dataSending.shopLogo = this.image;

    dataSending.shopBusinessLicenseIssueDate = this.changeJalaliToGregorian(
      dataSending.shopBusinessLicenseIssueDate
    );
    dataSending.shopBusinessLicenseExpireDate = this.changeJalaliToGregorian(
      dataSending.shopBusinessLicenseExpireDate
    );
    dataSending.countryAbbreviation = dataSending.countryAbbreviation['abbrivation'];
    dataSending.cityCode = parseInt(dataSending.cityCode);
    dataSending.guildId = parseInt(dataSending.guildId);
    this.locationInfoValue = dataSending;
    nav.select(3);
  }





  get bankAccountInfoForm() {
    return this.BankInfoForm.controls;
  }

  initBankInfoForm(){
    this.BankInfoForm = this.fb.group({
      iban : ['' , Validators.required],
      accountNumber : ['' , Validators.required],
      shareType : ['' , Validators.required],
      shareAmountMax : [''],
      shareAmountMin : [''],
      sharedAmount : [''],
      isMain : [false],
    });
  }

  onSharedTypeSelected(value: any) {
    this.sharedTypeId = parseInt(value.value.shareType);
    switch (this.sharedTypeId) {
      case 1:
        this.hasPercentage = true;
        this.hasAmount = false;

        value.value.sharedAmount = 0;
        break;
        case 2:
          this.hasPercentage = false;
          value.value.shareAmountMax = 0;
          value.value.shareAmountMin = 0;
          this.hasAmount = true;
        break;
    
      default:
        break;
    }
    
    
  }

  addBankInfo(){
    if (this.BankInfoForm.invalid) {
      this.isBankInfoFormSubmitted = true;
      return;
    }
    let dataSending = this.BankInfoForm.value;
    switch (this.sharedTypeId) {
      case 1:
        dataSending.sharedAmount = 0;
        if(dataSending.shareAmountMax === '' || dataSending.shareAmountMin === ''){
          this.toastr.error('کمترین مبلغ تسهیم و بیشترین مبلغ تسهیم را وارد کنید');
          return;
        }
        break;
        case 2:
          dataSending.shareAmountMax = 0;
          dataSending.shareAmountMin = 0;
          if(dataSending.sharedAmount=== '' ){
            this.toastr.error(' مبلغ تسهیم را وارد کنید');
            return;
          }
        break;
      default:
        break;
    }
    dataSending.sharedAmount = parseInt(dataSending.sharedAmount);
    dataSending.shareAmountMax = parseInt(dataSending.shareAmountMax);
    dataSending.shareAmountMin = parseInt(dataSending.shareAmountMin);
    dataSending.shareType = parseInt(dataSending.shareType);
    dataSending.customerId = 0;
    this.BankInfoList.push(dataSending);
    this.BankInfoForm.reset();
  }


  submitBankInfo(nav:any){
    if(this.BankInfoList.length > 0){
      nav.select(4)
    }else{
      this.toastr.error('هیچ حساب بانکی وارد نشده است')
    }
  }




  get contractInfo() {
    return this.contractFormInfo.controls;
  }

  initContractInfo(){
    this.contractFormInfo = this.fb.group({
      contractNumber : ['' , Validators.required],
      expireDate : ['' , Validators.required],
      serviceStartDate : ['' , Validators.required],
      description : ['' , Validators.required],
      projectId : ['' , Validators.required],
      shareType :  [''],
      sharedAmount :  [''],
      shareAmountMax :  [''],
      shareAmountMin :  [''],
    })
  }

  getAllProjects(){
    this.baseInfoService.getListOfProjects()
    .subscribe((res:any)=>{
      this.listOfProject = res;
    })
  }

  onSelectProject(event){
    this.isProject = true;
    let projectId = parseInt(event.target.value)
    let selectedProject = this.listOfProject.filter(item=>item.id === projectId)[0];
    this.contractFormInfo.patchValue({
      shareType :  selectedProject.shareType,
      sharedAmount :  selectedProject.sharedAmount,
      shareAmountMax :  selectedProject.shareAmountMax,
      shareAmountMin :  selectedProject.shareAmountMin,
    })
  }


  registerCustomer(){
    if (this.contractFormInfo.invalid) {
      this.isContractInfoFormSubmitted = true;
      return;
    }
    let dataSending = this.contractFormInfo.value;
    dataSending.introduced = 0;
    dataSending.introducedSharedType = "";
    dataSending.introducedSharedAmount = 0;
    dataSending.projectId = parseInt(dataSending.projectId)
    dataSending.expireDate = this.changeJalaliToGregorian(dataSending.expireDate);
    dataSending.serviceStartDate = this.changeJalaliToGregorian(dataSending.serviceStartDate);
    this.contractInfoValue = dataSending;
    let data = {}
    data = Object.assign(data ,this.registerRealCustomerFormValue , this.registerLegalCustomerFormValue , this.registerForeignCustomerFormValue);
    let customer = {};
    customer = Object.assign(customer , this.locationInfoValue);
    customer['ibans'] = this.BankInfoList;
    customer['contract'] = this.contractInfoValue;
    data['customer'] = Object.assign(customer , this.locationInfoValue);
    console.log("data : " , data);
    
    this.service.defineAcceptor(data)
    .subscribe((res=>{
      this.toastr.success('مشتری با موفقیت ثبت گردید');
      window.location.reload();
    }))
  
  }
}
