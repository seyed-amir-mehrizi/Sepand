import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  customerApi = 'Customer';

  constructor(private http: HttpClient) { }

  getListOfFirstRegistration(data:any){
    let params = {
      NationalId : data.NationalId,
      ShopName:data.ShopName,
      Page:data.Page,
      RequestType : data.RequestType,
      PspId:data.PspId,
      LegalNationalCode:data.LegalNationalCode,
      ForeignPervasiveCode:data.ForeignPervasiveCode,
    }
      return this.http.get(this.customerApi+'/first-registration' , {params});
  
}

}