import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import {AuthGuard} from './_helpers/auth.guard';
import {HomeComponent} from './components/home';
import {KaryawanComponent} from './components/master/karyawan';
import {AddKaryawanComponent} from './components/master/karyawan/addEmployee/add.karyawan.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
    children:  [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'employee', component: KaryawanComponent},
      {path: 'employee/addemployee', component: AddKaryawanComponent}
    ]
  }
  ,

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
