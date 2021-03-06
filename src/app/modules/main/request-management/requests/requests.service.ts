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
    const params = {
      NationalId : data.NationalId,
      ShopName:data.ShopName,
      Page:data.Page,
      RequestType : data.RequestType,
      PspId:data.PspId,
      LegalNationalCode:data.LegalNationalCode,
      ForeignPervasiveCode:data.ForeignPervasiveCode,
      CustomerKey:data.customerkey,

    }
      return this.http.get(this.customerApi+'/first-registration' , {params});

}
getListOfSentToPsp(data:any){
  const params = {
    NationalId : data.NationalId,
    ShopName:data.ShopName,
    Page:data.Page,
    RequestType : data.RequestType,
    PspId:data.PspId,
    LegalNationalCode:data.LegalNationalCode,
    ForeignPervasiveCode:data.ForeignPervasiveCode,
  }
    return this.http.get(this.customerApi+'/sent-to-psp' , {params});

}
getListOfShaparakProcess(data:any){
  const params = {
    NationalId : data.NationalId,
    ShopName:data.ShopName,
    Page:data.Page,
    RequestType : data.RequestType,
    PspId:data.PspId,
    LegalNationalCode:data.LegalNationalCode,
    ForeignPervasiveCode:data.ForeignPervasiveCode,
  }
    return this.http.get(this.customerApi+'/shaparak-process' , {params});

}
getListOfCompletedRequests(data:any){
  const params = {
    NationalId : data.NationalId,
    ShopName:data.ShopName,
    Page:data.Page,
    RequestType : data.RequestType,
    PspId:data.PspId,
    LegalNationalCode:data.LegalNationalCode,
    ForeignPervasiveCode:data.ForeignPervasiveCode,
  }
    return this.http.get(this.customerApi+'/completed-requests' , {params});

}

deleteRequest(data){
  const params = {
    id : data.id
  }
  return this.http.delete(this.customerApi+'/remove-request' , {params});
}


editrequest(data){
  return this.http.put(this.customerApi+'/edit-request' , data);
}

startEditRequest(data){
  return this.http.post(this.customerApi + '/start-edit', data).pipe(map(response => response));

}
cancelEditRequest(data){
  return this.http.post(this.customerApi + '/cancel-edit', data).pipe(map(response => response));

}


}