import { DataSource } from '@angular/cdk/table';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmployeeService} from '../_services/employee.service';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';

// @ts-ignore
export class EmployeeDatasource implements DataSource<Employee> {
  private employeeSubject = new BehaviorSubject<Employee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private employeeService: EmployeeService, private authenticationService: AuthenticationService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
    return this.employeeSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeeSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadTodos(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.employeeService.listEmployee({ page: pageNumber, size: pageSize, Authorization : this.authenticationService.currentUserValue.token})
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: EmployeeListResponse) => {
          this.employeeSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}

interface Employee {
    id : string;
    name : string;
}

export interface EmployeeListResponse{
    content: Employee[];
    totalElements: number;
}
