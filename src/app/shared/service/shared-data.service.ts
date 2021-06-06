import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs'; 


@Injectable({
    providedIn:'root'
})




export class SharedDataService { 
    constructor(private http: HttpClient){
    }
    sharedDataApi = 'SharedData';
    getNationalities(data:any){
        let params = {
            search : data
        }
        return this.http.get(this.sharedDataApi+'/search-nationalities',{params});
    }
    getCountriesList(data:any){
        let params = {
            name : data
        }
        return this.http.get(this.sharedDataApi+'/search-countries',{params});
    }
    getPersonType(){
        return this.http.get(this.sharedDataApi+'/person-type');

    }
    getDegreeType(){
        return this.http.get(this.sharedDataApi+'/degrees');

    }
    getAllAlphabetList(){
        return this.http.get(this.sharedDataApi+'/alphabets');

    }
}