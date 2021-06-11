import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customerApi = 'Customer';
  constructor(private http: HttpClient) { }

  getListOFCustomers(data:any){
      let params = {
        NationalId : data.NationalId,
        ShopName:data.ShopName,
        Page:data.Page,
        LastName : data.LastName,
        Name:data.Name,
        RegisterNo:data.RegisterNo,
        ForeignPervasiveCode:data.ForeignPervasiveCode,
      }
        return this.http.get(this.customerApi+'/customers' , {params});
    
  }

  editGuild(data){
    return this.http.post(this.customerApi + '/edit-guild', data).pipe(map(response => response));

  }
  editPostalCode(data){
    return this.http.post(this.customerApi + '/edit-postalCode', data).pipe(map(response => response));

  }

  activateTerminal(data){
    return this.http.post(this.customerApi + `/activate-terminals?customerId=${data}`, null).pipe(map(response => response));

  }
  deActivateTerminal(data){
    return this.http.post(this.customerApi + `/deactivate-terminals?customerId=${data}` , null).pipe(map(response => response));

  }

  getAllIbansForCustomer(data){
    let params = {
      customerId : data.customerId,
    }
      return this.http.get(this.customerApi+'/get-customer-ibans' , {params});
  }


  changeIban(data){
    return this.http.post(this.customerApi + '/change-ibans' , data).pipe(map(response => response));

  }
}
