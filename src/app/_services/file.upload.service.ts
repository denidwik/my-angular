import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {error} from 'util';
import {SERVER_ADDR} from '../_const/url';
import {Upload} from '../_models/upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {
  }

  pushFileToStorage(file: File) {
    const data: FormData = new FormData();
    data.append('formData', file);
    return this.http.post<Upload>(SERVER_ADDR + '/firebase/upload', data);
  }

  getFile(fileName) {
    console.log(fileName);
    const params = new HttpParams({fromObject : {'fileName' : fileName}});
    return this.http.get<Upload>(SERVER_ADDR + '/firebase/getFile', {params});
  }

}
