import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    acouuntApi = 'Account';

    constructor(private http: HttpClient) {
    }

    login(credential: any) {
        return this.http.post(this.acouuntApi + '/sign-in', credential)
            .pipe(
                map((response: any) => {
                    if (response && response.token) {
                        localStorage.setItem('token', response.token);
                        return true;
                    }
                    return false;
                })
            );
    }
}
