import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/operator/map';
import { Constants } from '../shared/constants';
import { User } from './types/User.type';

@Injectable()
export class UserService {


  userConnected:User;

  constructor (private _http:Http) {
  }

  sendUserName (userName:string) {
    return this._http.post(`http://${Constants.IP}:${Constants.SERVER_PORT}/users`, { userName: userName })
      .toPromise();
  }

  getUserById (id:number) {
    return this._http.get(`http://${Constants.IP}:${Constants.SERVER_PORT}/users/${id}`)
      .toPromise();
  }

}
