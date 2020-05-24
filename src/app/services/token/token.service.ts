import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  env = environment.api;

  constructor() { }

  handle(accessToken: any) {
    this.set(accessToken);
  }

  // set the token
  set(token) {
    localStorage.setItem('token', token);
  }

  // get the token
  get() {
    return localStorage.getItem('token');
  }

  // remove the token
  remove() {
    localStorage.removeItem('token');
  }

  // is the token valid
  isValid() {
    const token = this.get();
    if (token) {
        const payload = this.payload(token);
        if (payload) {
          return payload.iss === this.env + 'api/login';
        }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
