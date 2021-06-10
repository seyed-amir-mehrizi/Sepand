import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseInfoService {
  baseInfoApi = 'BaseInfo';

  constructor(private http: HttpClient) {}

  getListOfProjects() {
    return this.http.get(this.baseInfoApi + '/projects');
  }
}
