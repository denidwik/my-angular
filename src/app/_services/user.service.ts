import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_models/user';
import {SERVER_ADDR} from '../_const/url';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {

  }

  getAll(request) {
    const params = request;
    const headers = this.auth.getHeaders();
    return this.http.get<User[]>(SERVER_ADDR + '/api/users/findAllUser', {params, headers});
  }

  getById(id: string) {
    return this.http.get<User>(SERVER_ADDR + '/users/${id}');
  }

  findRole() {
    return this.http.get<User.Role>(SERVER_ADDR + '/api/users/findAllRole')
  }
}
