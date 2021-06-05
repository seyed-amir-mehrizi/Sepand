import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    acouuntApi = 'Account';

    constructor(private http: HttpClient) {
    }

    getUserList(){
        return this.http.get(this.acouuntApi+'/get-users')
    }

    changePassword(data:any){
        return this.http.post(this.acouuntApi + '/change-password', data).pipe(map(response => response));
    }

    
}
