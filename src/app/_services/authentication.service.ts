import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {SERVER_ADDR} from '../_const/url';
import {User} from '../_models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public validateToken: boolean;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${SERVER_ADDR}/api/auth/signin`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getHeaders(): HttpHeaders {
      let headers = new HttpHeaders();
      const token = this.currentUserSubject.getValue().accessToken;
      headers = headers.append('Content-Type', 'application/json');
      if (token !== null) {
        headers = headers.append('Authorization', token);
      }
      return headers;
    }

    checkToken(token) {
      const headers = new HttpHeaders({ Authorization: token });
      return this.http.get<boolean>(SERVER_ADDR + '/api/auth/checkToken', {headers});
    }
}
