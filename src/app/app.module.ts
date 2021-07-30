import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClrAlertModule, ClrDropdownModule, ClrLoadingModule} from '@clr/angular';
import {AlertComponent} from './components/alert.component';
import {HomeComponent} from './components/home';
import {KaryawanComponent} from './components/master/karyawan';
import {LoginService} from './_services/login.service';
import {ErrorDialogService} from './components/error-dialog/errordialog.service';
import {HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import {ErrorDialogComponent} from './components/error-dialog/errordialog.component';
import {AddKaryawanComponent} from './components/master/karyawan/addEmployee/add.karyawan.component';
import {OnlynumberDirective} from './interceptor/onlynumber.directive';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    AlertComponent,
    OnlynumberDirective,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    KaryawanComponent,
    AddKaryawanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    HttpClientModule,
    ClrLoadingModule,
    ClrDropdownModule,
    ClrAlertModule,
    MatDialogModule,
  ],
  providers: [
    LoginService,
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
