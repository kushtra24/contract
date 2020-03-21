import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home/home.component';
import {ContractListComponent} from './contract-list/contract-list.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent },
  { path: 'contracts', component: ContractListComponent }
];

export const  routing = RouterModule.forRoot(APP_ROUTES);
