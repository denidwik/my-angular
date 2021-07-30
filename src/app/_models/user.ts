import {Role} from './role';

export class User {
    id: number;
    employeeCode: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    accessToken: string;
    tokenType: string;
    role: Role;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string = 'M';
    address: string;
    fileName: string = '19826a2c-a7fb-4932-b946-f08651eca533.png';

    code : string;

    getToken() {
      return this.accessToken + ' ' + this.token;
    }
}

export interface UserAttributes {
  content: Array<User>;
}
