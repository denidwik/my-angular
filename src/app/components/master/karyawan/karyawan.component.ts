import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {first, map} from 'rxjs/operators';

import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {AuthenticationService} from '../../../_services/authentication.service';
import {MatPaginator, MatSort, MatSortModule, MatTableDataSource} from '@angular/material';
import {EmployeeDatasource} from '../../../datasource/employee.datasource';
import {EmployeeService} from '../../../_services/employee.service';



@Component({
  templateUrl: 'karyawan.component.html',
  styleUrls: ['karyawan.component.css']
})
export class KaryawanComponent implements AfterViewInit {
  loading = false;
  currentUser: User;
  errorMessage = false;
  userFromApi: User;
  displayedColumns: string[] = ['position', 'email', 'username', 'symbol', 'details', 'update', 'delete'];

  // @ts-ignore
  dataSource =  new MatTableDataSource<User>();
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    // console.log( this.currentUser)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    // console.log( this.currentUser)
    this.currentUser = this.authenticationService.currentUserValue;

    this.userService.getAll({page: 0, size: 10}).pipe(map(
      response => {
        console.log(response);
        return response;
      }
    )).subscribe(
      result => {
        this.dataSource.data = result;
        console.log(this.dataSource.data);
      }
    );

    // this.dataSource = this.userService.getAll({page: this.paginator.pageIndex, size: this.paginator.pageSize, token: this.currentUser.token});
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public customSort = (event) => {
    console.log(event);
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
