import {Component, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';

import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    sidenav: MatSidenav;
    isExpanded: boolean;
    showSubmenuManagement: boolean;
    showSubmenuPenjualan: boolean;
    isShowing: boolean;
    showSubSubMenu: boolean;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.showSubSubMenu = false;
        this.isExpanded = true;
        this.showSubmenuManagement = false;
        this.showSubmenuPenjualan = false;
        this.isShowing = false;
        this.currentUser = this.authenticationService.currentUserValue;
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        this.loading = true;
        // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });
    }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
