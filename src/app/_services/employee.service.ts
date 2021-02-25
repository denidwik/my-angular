import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SERVER_ADDR} from '../_const/url';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    constructor(protected http: HttpClient){ }

    public getEmployeeData() {

    }

  listEmployee(request) {
    const endpoint = SERVER_ADDR + "/employee/listEmployee";
    const params = request;
    return this.http.get(endpoint, { params });
  }
}
