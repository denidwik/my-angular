import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  templateUrl: 'karyawan.component.html',
  styleUrls: ['karyawan.component.css']
})
export class KaryawanComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

  // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        this.loading = true;
        // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });
    }
}
