import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TransferRole } from 'src/app/shared/service/transfer-role.service';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    acouuntApi = 'Account';
    public userRole;
    public token;


    constructor(private http: HttpClient) {
    }

    login(credential: any) {
        return this.http.post(this.acouuntApi + '/sign-in', credential)
            .pipe(
                map((response: any) => {
                    if (response && response.token) {
                        this.userRole = response.role;
                        this.token = response.token;
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('r', response.role);
                        return true;
                    }
                    return false;
                })
            );
    }
}
