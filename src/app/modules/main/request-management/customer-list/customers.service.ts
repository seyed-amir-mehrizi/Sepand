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
        Page:data.Page
      }
        return this.http.get(this.customerApi+'/customers' , {params});
    
  }

  editGuild(data){
    return this.http.post(this.customerApi + '/edit-guild', data).pipe(map(response => response));

  }
}
