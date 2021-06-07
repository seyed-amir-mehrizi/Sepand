import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        Page:data.Page
      }
        return this.http.get(this.customerApi+'/customers' , {params});
    
  }
}
