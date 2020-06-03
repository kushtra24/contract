import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../interfaces/User';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  env = environment.api;

  constructor( private http: HttpClient) { }

  getUser() {
    return new Observable( observer => {

      const url = this.env + 'api/user';

      this.http.get(url)
        .subscribe( (data: User) => {
          observer.next(data);
        });
    });
  }

  getAllUsers() {
    return new Observable( observer => {

      const url = this.env + 'api/users';

      this.http.get(url)
        .subscribe( (data: User) => {
          observer.next(data);
        }, err => {
          throw err;
        });
    });
  }

}
