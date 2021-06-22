import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseInfoService {
  baseInfoApi = 'BaseInfo';

  constructor(private http: HttpClient) {}

  getListOfProjects() {
    return this.http.get(this.baseInfoApi + '/projects');
  }

  getPspList(){
    return this.http.get(this.baseInfoApi + '/psps');

  }

  addNewProject(data){
    return this.http.post(this.baseInfoApi + '/add-project' , data)
  }

  editProject(data){
    return this.http.put(this.baseInfoApi + '/edit-project' , data)

  }
}
