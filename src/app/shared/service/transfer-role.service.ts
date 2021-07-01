import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class TransferRole {
    private profileObs$ = new BehaviorSubject(null);
    getProfileObs() {
        return this.profileObs$.asObservable();
    }

    setProfileObs(profile) {
        console.log("profile : " , profile);
        
        this.profileObs$.next(profile);
    }

}