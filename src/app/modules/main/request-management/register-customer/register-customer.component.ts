import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';
import { RegisterCustomerService } from './register-customer.service';
import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  allNationalities: any = [];
  personTypeList: any = [];
  registerRealCustomerForm: FormGroup;
  registerLegalCustomerForm: FormGroup;
  registerForeignForm: FormGroup;
  isRegisterCustomerSubmitted: boolean = false;
  isRegisterLegalCustomerSubmitted: boolean = false;
  isRegisterForeignCustomerSubmitted: boolean = false;
  listOfAlphabets: any = [];
  isReal: boolean = false;
  isLegal: boolean = false;
  isForeign: boolean = false;
  isEmpty: boolean = true;
  degreeList: any = [];
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  thirdForm!: FormGroup;
  changePasswordForm!: FormGroup;
  isChangePasswordSubmitted: boolean = false;
  customerType: number;
  hasNationalNumber: boolean = false;
  hasRegisterNumber: boolean = false;
  customerTypeValue;
  registerRealCustomerFormValue: any = {};
  registerLegalCustomerFormValue: any = {};

  disabledLocationInfo: boolean = true;
  disabledBankInfo: boolean = true;
  disabledContractInfo: boolean = true;
  constructor(
    private sharedService: SharedDataService,
    private fb: FormBuilder,
    private service: RegisterCustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPersonType();
    this.getListOfDegrees();
    this.getListOfAllAlphabet();
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
    this.registerRealCustomerFormValue = this.registerRealCustomerForm.value;
    nav.select(2);
    this.disabledLocationInfo = false;
  }

  initLegalForm() {
    this.registerLegalCustomerForm = this.fb.group({
      registerDate: ['', Validators.required],
      registerNo: ['', Validators.required],
      comNameEn: ['', Validators.required],
      comNameFa: ['', Validators.required],
      commercialCode: ['', Validators.required],
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
      postalCode: ['', Validators.required],
      nationalLegalCode: ['', Validators.required],
      isDisable: [''],
    });
  }
  get registerLegalCustomerFormInfo() {
    return this.registerLegalCustomerForm.controls;
  }

  initForeignForm() {
    this.registerForeignForm = this.fb.group({
      passportExpireDate: ['', Validators.required],
      comNameEn: ['', Validators.required],
      passportNo: ['', Validators.required],
      foreignPervasiveCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      rsidencyType: ['', Validators.required],
    });
  }
  get registerForeignCustomerFormInfo() {
    return this.registerForeignForm.controls;
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
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.hasNationalNumber = true;
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

  checkRegisterNumber() {
    const dataSending = this.registerLegalCustomerForm.value;
    if (dataSending.registerNo) {
      let data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.registerNo,
      };
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.hasRegisterNumber = true;
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

  checkForeignPervasiveCode() {
    const dataSending = this.registerForeignForm.value;
    if (dataSending.foreignPervasiveCode) {
      let data = {
        type: this.customerType,
        uniqueIdentifier: dataSending.foreignPervasiveCode,
      };
      this.service.getPersonData(data).subscribe((res: any) => {
        if (res) {
          this.hasRegisterNumber = true;
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
    this.registerLegalCustomerFormValue = this.registerLegalCustomerForm.value;
    nav.select(2);
  }

  submitForeignCustomer(nav: any) {
    if (this.registerForeignForm.invalid) {
      this.isRegisterForeignCustomerSubmitted = true;
      return;
    } else if (this.hasRegisterNumber === false) {
      this.toastr.error('در ابتدا استعلام شماره ثبت شرکت را بررسی کنید');
    }
    const dataSending = this.registerForeignForm.value;
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
    this.registerLegalCustomerFormValue = this.registerForeignForm.value;
    nav.select(2);
  }

  getListOfAllAlphabet() {
    this.sharedService.getAllAlphabetList().subscribe((result: any) => {
      this.listOfAlphabets = result;
    });
  }
}
