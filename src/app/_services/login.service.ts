import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getAlbums(email, password) {
    return this.http.post('https://jsonplaceholder.typicode.com/albums', {email, password});
  }
}
