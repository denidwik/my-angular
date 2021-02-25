import {Role} from './role';

export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    accessToken: string;
    tokenType: string;
    role: Role;

    code : string;

    getToken() {
      return this.accessToken + ' ' + this.token;
    }
}

export interface UserAttributes {
  content: Array<User>;
}
