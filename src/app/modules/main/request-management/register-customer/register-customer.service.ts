import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterCustomerService {
  customerApi = 'Customer';

  constructor(private http: HttpClient) { }

  createCustomer(data:any){
    return this.http.post(this.customerApi + '/add-person', data).pipe(map(response => response));
}

getPersonData(data){
  let params = {
    uniqueIdentifier : data.uniqueIdentifier,
    type : data.type
}
return this.http.get(this.customerApi+'/get-person',{params});
}



}
