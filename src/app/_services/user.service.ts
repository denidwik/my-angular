import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/user';
import {SERVER_ADDR} from '../_const/url';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(SERVER_ADDR + '/users');
    }

    getById(id: number) {
        return this.http.get<User>(SERVER_ADDR + '/users/${id}');
    }
}
