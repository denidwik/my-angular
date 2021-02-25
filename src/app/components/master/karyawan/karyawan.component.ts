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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'details', 'update', 'delete'];

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
