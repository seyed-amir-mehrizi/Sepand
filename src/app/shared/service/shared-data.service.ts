import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor(private http: HttpClient) {}
  sharedDataApi = 'SharedData';
  getNationalities(data: any) {
    const params = {
      search: data,
    };
    return this.http.get(this.sharedDataApi + '/search-nationalities', {
      params,
    });
  }
  getCountriesList(data: any) {
    const params = {
      name: data,
    };
    return this.http.get(this.sharedDataApi + '/search-countries', { params });
  }
  getPersonType() {
    return this.http.get(this.sharedDataApi + '/person-type');
  }
  getDegreeType() {
    return this.http.get(this.sharedDataApi + '/degrees');
  }
  getAllAlphabetList() {
    return this.http.get(this.sharedDataApi + '/alphabets');
  }
  getAllProvince() {
    return this.http.get(this.sharedDataApi + '/provinces');
  }
  getAllGuildsCategories() {
    return this.http.get(this.sharedDataApi + '/guilds-categories');
  }
  getAllCountries() {
    return this.http.get(this.sharedDataApi + '/countries');
  }
  getSharedTypeCategories() {
    return this.http.get(this.sharedDataApi + '/share-type');
  }
  getCitiesOfProvince(data: any) {
    const params = {
      provinceId: data,
    };
    return this.http.get(this.sharedDataApi + '/cities', {
      params,
    });
  }

  getAllRequestType() {
    return this.http.get(this.sharedDataApi + '/request-types');
  }
  getAllDocumentType() {
    return this.http.get(this.sharedDataApi + '/document-types');
  }

}
