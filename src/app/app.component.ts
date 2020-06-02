import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'contract-management';

  isLoading: boolean;

  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    // translate.setDefaultLang('de');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/de|en/) ? browserLang : 'de');
  }

}
