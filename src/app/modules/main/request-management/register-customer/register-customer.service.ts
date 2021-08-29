import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterCustomerService {
  customerApi = 'Customer';

  constructor(private http: HttpClient) { }

  createCustomer(data: any){
    return this.http.post(this.customerApi + '/add-person', data).pipe(map(response => response));
}

getPersonData(data){
  const params = {
    uniqueIdentifier : data.uniqueIdentifier,
    type : data.type
};
  return this.http.get(this.customerApi + '/get-person', {params});
}

defineAcceptor(data){
  return this.http.post(this.customerApi + '/define-acceptor', data).pipe(map(response => response));

}



}
