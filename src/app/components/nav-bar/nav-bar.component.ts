import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService,
    public translate: TranslateService
  ) {
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
    this.reset();
  }

  private reset() {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(MouseEvent) {
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
