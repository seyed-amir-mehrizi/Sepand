import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseInfoService {
  baseInfoApi = 'BaseInfo';

  constructor(private http: HttpClient) {}

  getListOfGuild() {
    return this.http.get(this.baseInfoApi + '/guilds');
  }
}
