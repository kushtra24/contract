import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ContractListComponent } from './routes/contract-list/contract-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserComponent } from './routes/user/user.component';
import {routing} from './app.routing';
import { HomeComponent } from './routes/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { CreateContractComponent } from './routes/create-contract/create-contract.component';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ContractShowComponent } from './routes/contract-show/contract-show.component';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './components/register/register.component';
import {FileUploadModule} from 'ng2-file-upload';
import { LoginComponent } from './routes/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import localeFr from '@angular/common/locales/de';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatPaginatorI18nService} from '../assets/i18n/PaginatorI18n';
import { UsersListComponent } from './routes/users-list/users-list.component';
registerLocaleData(localeDe, 'de');

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContractListComponent,
    UserComponent,
    HomeComponent,
    CreateContractComponent,
    ContractShowComponent,
    RegisterComponent,
    LoginComponent,
    UsersListComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterModule,
        MatToolbarModule,
        routing,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatOptionModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        CdkTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        HttpClientModule,
        FileUploadModule,
        MatCardModule,
        MatSnackBarModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
    ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  providers: [
    MatDatepickerModule,
    {provide: LOCALE_ID, useValue: 'de-DE' },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorI18nService,
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
