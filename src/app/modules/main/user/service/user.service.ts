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
        return this.http.get(this.acouuntApi + '/get-users');
    }

    changePassword(data: any){
        return this.http.post(this.acouuntApi + '/change-password', data).pipe(map(response => response));
    }

    getRolesList(){
        return this.http.get(this.acouuntApi + '/get-roles');
    }

    createNewUser(data: any){
        return this.http.post(this.acouuntApi + '/create-user', data).pipe(map(response => response));
    }
    lockUser(data: any){
        return this.http.post(this.acouuntApi + '/user-lock', data).pipe(map(response => response));
    }
    unlockUser(data: any){
        return this.http.post(this.acouuntApi + '/user-unlock', data).pipe(map(response => response));
    }



}
