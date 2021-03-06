import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customerApi = 'Customer';
  constructor(private http: HttpClient) { }

  getListOFCustomers(data: any){
      const params = {
        NationalId : data.NationalId,
        ShopName: data.ShopName,
        Page: data.Page,
        LastName : data.LastName,
        Name: data.Name,
        RegisterNo: data.RegisterNo,
        ForeignPervasiveCode: data.ForeignPervasiveCode,
        CustomerId: data.CustomerId
      };
      return this.http.get(this.customerApi + '/customers' , {params});

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
    const params = {
      customerId : data.customerId,
    };
    return this.http.get(this.customerApi + '/get-customer-ibans' , {params});
  }


  changeIban(data){
    return this.http.post(this.customerApi + '/change-ibans' , data).pipe(map(response => response));

  }

  uploadDocument(data){
    const formData: FormData = new FormData();
    formData.append('DocTypeId', data.DocTypeId);
    formData.append('CustomerId', data.CustomerId);
    formData.append('FormFile', data.FormFile);
// formData.append('ComponentId', componentId);
    return this.http.post(this.customerApi + '/upload-file' , formData).pipe(map(response => response));

  }

  getListOfUploadedDocument(data){
    const params = {
      customerId : data.customerId,
    };
    return this.http.get(this.customerApi + '/customer-files' , {params});
  }

  downloadDocument(data){
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token'),
      })
    };
    const params = {
      id : data.id,
    };
    return this.http.get(this.customerApi + `/download-file?id=${data.id}` , httpOptions);
  }
}
