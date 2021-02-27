import {Component, Inject, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../home';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public dialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(string): void {
    this.dialogRef.close();
    if (string == '401') {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
  }
}
