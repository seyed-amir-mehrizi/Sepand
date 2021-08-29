import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, Observable, of } from 'rxjs';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';
import { RegisterCustomerService } from './register-customer.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseInfoService } from '../../basic-info/base-info.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

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
  people$: Observable<Object | any[]>;
  country$: Observable<Object | any[]>;

  autocomplete$: Observable<Object | any[]>;
  autocomplete_subject$ = new Subject<string>();
  allNationalities: any = [];
  personTypeList: any = [];
  registerRealCustomerForm: FormGroup;
  registerLegalCustomerForm: FormGroup;
  registerForeignForm: FormGroup;
  LocationInfoForm: FormGroup;
  BankInfoForm: FormGroup;
  contractFormInfo: FormGroup;
  isRegisterCustomerSubmitted = false;
  isRegisterLegalCustomerSubmitted = false;
  isRegisterForeignCustomerSubmitted = false;
  isLocationInfoFormSubmitted = false;
  isBankInfoFormSubmitted = false;
  isContractInfoFormSubmitted = false;
  listOfAlphabets: any = [];
  proviceList: any = [];
  isReal = false;
  isLegal = false;
  isForeign = false;
  isEmpty = true;
  hasAmount = false;
  degreeList: any = [];
  guildList: any = [];
  fileToUpload: File = null;
  proviceCitiesList: any = [];
  sharedTypeList: any = [];
  BankInfoList: any = [];
  isProject = false;
  sharedTypeId: number;
  isChangePasswordSubmitted = false;
  customerType: number;
  hasNationalNumber = false;
  hasRegisterNumber = false;
  hasForeignNumber = false;
  hasPercentage = false;
  autocompleteLoading = false;
  customerTypeValue;
  registerRealCustomerFormValue: any = {};
  registerLegalCustomerFormValue: any = {};
  registerForeignCustomerFormValue: any = {};
  locationInfoValue: any = {};
  contractInfoValue: any = {};
  listOfProject: any = [];
  listOfCountries: any = [];
  imageUrl: any;
  disabledLocationInfo = true;
  disabledBankInfo = true;
  disabledContractInfo = true;
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
    this.getListOfCountries();
    this.initBankInfoForm();
    this.getListOfSharedTypes();
    this.initContractInfo();
    this.getAllProjects();
    this.loadNationalities();
  }

  private loadNationalities() {
    this.autocomplete$ = concat(
      of([]), // default items
      this.autocomplete_subject$.pipe(
        distinctUntilChanged(),
        tap(() => (this.autocompleteLoading = true)),
        switchMap((term) =>
        this.sharedService.getNationalities(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.autocompleteLoading = false))
          )
        )
      )
    );
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
    )
  getAllNationalities(searchText: string): Observable<any[]> {
    return this.sharedService
      .getNationalities(searchText)
      .pipe(map((response: any) => response));
  }
  // display in show box
  nationalitiesFormatter = (result: { nationalName: string }) =>
    result.nationalName || ''

  // select in input

  nationalitiesInputFormatter = (result: { nationalName: string }) =>
    result.nationalName || ''

  countries_Serach = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),

      switchMap((searchText) =>
        searchText.length < 2 ? [] : this.getAllcountries(searchText)
      )
    )
  getAllcountries(searchText: string): Observable<any[]> {
    return this.sharedService
      .getCountriesList(searchText)
      .pipe(map((response: any) => response));
  }
  // display in show box
  countriesFormatter = (result: { farsiName: string }) =>
    result.farsiName || ''

  // select in input

  countriesInputFormatter = (result: { farsiName: string }) =>
    result.farsiName || ''

    nationalitySetValue(){
      this.registerRealCustomerForm.setValue({
        nationalityId : {id: 103, nationalName: 'ایران', people: []}
      });
    }

  initRealForm() {
    this.registerRealCustomerForm = this.fb.group({
      degreeId: ['', Validators.required],
      nationalNumber: ['', [Validators.required , Validators.maxLength(10) , Validators.minLength(10)]],
      firstNameFa: ['', Validators.required],
      lastNameFa: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      lastNameEn: ['', Validators.required],
      nationalityId: ['ایران', Validators.required],
      birthLocation: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthCertificatePlaceOfIssue: ['', Validators.required],
      fatherNameFa: ['', Validators.required],
      fatherNameEn: ['', Validators.required],
      sex: ['', Validators.required],
      birthCertificateNo: ['', Validators.required],
      birthCertificateSerial: ['', [Validators.required]],
      birthCertificateAlphabiticNoId: ['', Validators.required],
      birthCertificateNumericNo: ['', [Validators.required , , Validators.minLength(2) , Validators.maxLength(2)]],
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // isDisable: [''],
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
      this.toastr.info('در ابتدا استعلام کد ملی خود را بررسی کنید');
      return;
    }
    const dataSending = this.registerRealCustomerForm.value;
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.nationalityId = parseInt(dataSending.nationalityId.id);
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
    dataSending.isDisable = true;
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
        // this.nationalitySetValue();
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

  checkMax(event) {
    const value = parseInt(event.target.value);
    if (value > 100) {
      this.toastr.info('بیشترین مبلغ تسهیم 100 می باشد');
      event.target.value = '';
    }
  }

  checkMin(event) {
    const value = parseInt(event.target.value);
    if (value < 0) {
      event.target.value = '';
    }
  }

  FarsiOnly = (event) => {
    const value = event.key;
    const p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(value)) {
      return false;
  }
    return true;

  }

  englishOnly = (event) => {
    const value = event.key;
    const p = /^[a-zA-Z0-9, ]*$/;
    if (!p.test(value)) {
      return false;
  }
    return true;

  }

  webSiteOnly = (event) => {
    const value = event.key;
    const p = /^[a-zA-Z0-9,:/@.? ]*$/;
    if (!p.test(value)) {
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
      const data = {
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
            // isDisable: res.isDisable,
          });
        }
      });
    } else {
      this.toastr.info('ابتدا کد ملی خود را وارد کنید...');
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
      commercialCode: ['', [ Validators.required , Validators.maxLength(10)]],
      degreeId: ['', Validators.required],
      nationalNumber: ['', [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]],
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
      birthCertificateNumericNo: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(2)]],
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nationalLegalCode: ['', Validators.required],
      // isDisable: [''],
    });
  }
  get registerLegalCustomerFormInfo() {
    return this.registerLegalCustomerForm.controls;
  }

  checkRegisterNumber() {
    const dataSending = this.registerLegalCustomerForm.value;
    if (dataSending.nationalLegalCode) {
      const data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.nationalLegalCode,
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
            // isDisable: res.isDisable,
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
      this.toastr.info('ابتدا شماره شناسه ملی خود را وارد کنید...');
    }
  }

  submitLegalCustomer(nav: any) {
    if (this.registerLegalCustomerForm.invalid) {
      this.isRegisterLegalCustomerSubmitted = true;
      return;
    } else if (this.hasRegisterNumber === false) {
      this.toastr.info('در ابتدا استعلام شماره شناسه ملی شرکت را بررسی کنید');
      return;
    }
    const dataSending = this.registerLegalCustomerForm.value;
    dataSending.registerDate = this.changeJalaliToGregorian(
      dataSending.registerDate
    );
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.nationalityId = parseInt(dataSending.nationalityId.id);
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
    dataSending.isDisable = true;
    this.registerLegalCustomerFormValue = dataSending;
    nav.select(2);
    this.disabledLocationInfo = false;
  }

  checkForeignPervasiveCode() {
    const dataSending = this.registerForeignForm.value;
    if (dataSending.foreignPervasiveCode) {
      const data = {
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
      this.toastr.info('ابتدا شماره اتباع خود را وارد کنید...');
    }
  }

  submitForeignCustomer(nav: any) {
    if (this.registerForeignForm.invalid) {
      this.isRegisterForeignCustomerSubmitted = true;
      return;
    } else if (this.hasForeignNumber === false) {
      this.toastr.info('در ابتدا استعلام شماره اتباع را بررسی کنید');
      return;
    }
    const dataSending = this.registerForeignForm.value;
    dataSending.birthDate = this.changeJalaliToGregorian(dataSending.birthDate);
    dataSending.passportExpireDate = this.changeJalaliToGregorian(
      dataSending.passportExpireDate
    );
    dataSending.nationalityId = parseInt(dataSending.nationalityId.id);
    dataSending.countryCode = String(dataSending.countryCode.id);
    dataSending.sex = parseInt(dataSending.sex);
    dataSending.degreeId = parseInt(dataSending.degreeId);
    dataSending.rsidencyType = true;
    dataSending.vitalStatus = true;
    dataSending.isForeign = true;
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
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }
  get registerForeignCustomerFormInfo() {
    return this.registerForeignForm.controls;
  }

  initLocationInfoForm() {
    this.LocationInfoForm = this.fb.group({
      mobileNumber: ['', [Validators.required , Validators.minLength(11) , Validators.maxLength(11)]],
      telephone: ['', [Validators.required , Validators.pattern(/^[1-9][0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      addressFa: ['', Validators.required],
      addressEn: ['', Validators.required],
      shopPostalCode: ['', [Validators.required , Validators.pattern(/^[1-9][0-9]*$/)]],
      shopFaxNumber: ['',  [Validators.required , Validators.pattern(/^[1-9][0-9]*$/)]],
      shopTelephoneNumber: ['', [Validators.required , Validators.pattern(/^[1-9][0-9]*$/)]],
      shopCityPreCode: ['', [Validators.required , Validators.minLength(3)]],
      shopBusinessLicenseNumber: ['', Validators.required],
      shopBusinessLicenseIssueDate: ['', Validators.required],
      shopBusinessLicenseExpireDate: ['', Validators.required],
      // shopEmail: ['', [Validators.required, Validators.email]],
      shopAddress: ['', Validators.required],
      redirectUrl: ['', [Validators.required]],
      guildId: ['', Validators.required],
      shopLogo: [''],
      shopNameFa: ['', Validators.required],
      shopNameEn: ['', Validators.required],
      webSiteAddress: ['', [Validators.required ]],
      provinceAbbreviation: ['', Validators.required],
      countryAbbreviation: ['', Validators.required],
      cityCode: ['', Validators.required],
      taxPayerCode: ['', [ Validators.required , Validators.maxLength(10)]],
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
    // this.sharedService.getAllGuildsCategories().subscribe((res: any) => {
    //   this.guildList = res;
    // });
    this.people$ =  this.sharedService.getAllGuildsCategories();
  }

  getListOfCountries() {
    // this.sharedService.getAllGuildsCategories().subscribe((res: any) => {
    //   this.guildList = res;
    // });
    this.sharedService.getAllCountries()
    .subscribe(res => {
      this.listOfCountries = res;
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



  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.LocationInfoForm.patchValue({
        shopLogo: myReader.result
      });
    };
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
    dataSending.countryAbbreviation = dataSending.countryAbbreviation.abbrivation;
    dataSending.cityCode = parseInt(dataSending.cityCode);
    dataSending.guildId = parseInt(dataSending.guildId);
    dataSending.shopLogo = dataSending.shopLogo ? dataSending.shopLogo : '',
    dataSending.shopEmail = dataSending.email;
    dataSending.isSharedAccount = false;
    dataSending.isMultiAccount = false;
    this.locationInfoValue = dataSending;
    nav.select(3);
  }





  get bankAccountInfoForm() {
    return this.BankInfoForm.controls;
  }

  initBankInfoForm() {
    this.BankInfoForm = this.fb.group({
      iban: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      accountNumber: ['', Validators.required],
      shareType: ['', Validators.required],
      shareAmountMax: [''],
      shareAmountMin: [''],
      sharedAmount: [''],
      isMain: [true],
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
    if (this.BankInfoList.length > 0){
      this.BankInfoList = [];
    }



  }

  addBankInfo() {
    if (this.BankInfoForm.invalid) {
      this.isBankInfoFormSubmitted = true;
      return;
    }
    const dataSending = this.BankInfoForm.value;
    switch (this.sharedTypeId) {
      case 1:
        dataSending.sharedAmount = 0;
        if (dataSending.shareAmountMax === '' || dataSending.shareAmountMin === '') {
          this.toastr.info('کمترین مبلغ تسهیم و بیشترین مبلغ تسهیم را وارد کنید');
          return;
        }
        break;
      case 2:
        dataSending.shareAmountMax = 0;
        dataSending.shareAmountMin = 0;
        if (dataSending.sharedAmount === '') {
          this.toastr.info(' مبلغ تسهیم را وارد کنید');
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
    dataSending.iban = (`IR${dataSending.iban}`).replace(/\s+/g, '');
    this.BankInfoList.push(dataSending);
    this.BankInfoList[0].sharedAmount = -1;
    this.BankInfoList[0].shareAmountMax = -1;
    this.BankInfoList[0].shareAmountMin = -1;
    this.BankInfoList[0].isMain = true;

    this.BankInfoForm.reset({
      shareType: this.BankInfoForm.get('shareType').value,
    });
    this.isBankInfoFormSubmitted = false;
    this.BankInfoForm.patchValue({
      isMain : false
    });
  }


  deleteIbanList(index){
    this.BankInfoList.splice(index , 1);
  }


  submitBankInfo(nav: any) {
    if (this.BankInfoList.length > 0) {
      nav.select(4);
    } else {
      this.toastr.info('هیچ حساب بانکی وارد نشده است');
    }
  }




  get contractInfo() {
    return this.contractFormInfo.controls;
  }

  initContractInfo() {
    this.contractFormInfo = this.fb.group({
      contractNumber: ['', Validators.required],
      expireDate: ['', Validators.required],
      serviceStartDate: ['', Validators.required],
      description: [''],
      projectId: ['', Validators.required],
      shareType: [''],
      sharedAmount: [''],
      shareAmountMax: [''],
      shareAmountMin: [''],
    });
  }

  getAllProjects() {
    this.baseInfoService.getListOfProjects()
      .subscribe((res: any) => {
        this.listOfProject = res;
      });
  }

  onSelectProject(event) {
    this.isProject = true;
    const projectId = parseInt(event.target.value);
    const selectedProject = this.listOfProject.filter(item => item.id === projectId)[0];
    this.contractFormInfo.patchValue({
      shareType: selectedProject.shareType,
      sharedAmount: selectedProject.sharedAmount,
      shareAmountMax: selectedProject.shareAmountMax,
      shareAmountMin: selectedProject.shareAmountMin,
    });
  }


  registerCustomer() {
    if (this.contractFormInfo.invalid) {
      this.isContractInfoFormSubmitted = true;
      return;
    }
    const dataSending = this.contractFormInfo.value;
    dataSending.introduced = 0;
    dataSending.introducedSharedType = '';
    dataSending.introducedSharedAmount = 0;
    dataSending.projectId = parseInt(dataSending.projectId);
    dataSending.expireDate = this.changeJalaliToGregorian(dataSending.expireDate);
    dataSending.serviceStartDate = this.changeJalaliToGregorian(dataSending.serviceStartDate);
    this.contractInfoValue = dataSending;
    let data = {};
    data = Object.assign(data, this.registerRealCustomerFormValue, this.registerLegalCustomerFormValue, this.registerForeignCustomerFormValue);
    let customer = {};
    customer = Object.assign(customer, this.locationInfoValue);
    customer.ibans = this.BankInfoList;
    customer.contract = this.contractInfoValue;
    data.customer = Object.assign(customer, this.locationInfoValue);
    this.service.defineAcceptor(data)
      .subscribe((res => {
        // this.toastr.success('مشتری با موفقیت ثبت گردید');
        window.location.reload();
      }));

  }
}
