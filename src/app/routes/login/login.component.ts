import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  constructor( private authService: AuthService) {
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.form);
  }




}
