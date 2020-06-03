import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '../token/token.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env = environment.api;
  error: any;

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();


  constructor(private http: HttpClient,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private token: TokenService,
              private route: Router
  ) { this.reset(); }


  /**
   * reset
   */
  reset() {
    this.error = null;
  }


  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  /**
   * login
   * @param loginForm login form
   */
  login(loginForm) {
    return this.http.post(this.env + 'api/login', loginForm)
      .subscribe(data => {
        this.handleResponse(data);
        },
          error => this.handleError(error)
      );
  }


  handleResponse(data: any) {
    // get access_token from request (needs to be names data.access_token)
    this.token.handle(data.access_token);
    // change authenticate status to true
    this.changeAuthStatus(true);
    // redirect to home if logged in
    this.route.navigateByUrl('');
  }

  /**
   * has herror show snak bar
   * @param error the error message
   */
  handleError(error) {
    this.error = error.error.error;

    this._snackBar.open(this.error, 'OK', {
      duration: 3000
    });
  }

  /**
   * get auth token
   * @param token auth
   */
  getAuthToken(token?: any) {
      return this.token.get();
  }

}
