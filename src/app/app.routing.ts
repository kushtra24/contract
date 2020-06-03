import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './routes/user/user.component';
import {HomeComponent} from './routes/home/home.component';
import {ContractListComponent} from './routes/contract-list/contract-list.component';
import {CreateContractComponent} from './routes/create-contract/create-contract.component';
import {ContractShowComponent} from './routes/contract-show/contract-show.component';
import {LoginComponent} from './routes/login/login.component';
import {IsLoggedInService} from './routes/auth-status/is-logged-in.service';
import {IsLogedOutService} from './routes/auth-status/is-loged-out.service';
import {UsersListComponent} from './routes/users-list/users-list.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLoggedInService]},

  { path: 'login', component: LoginComponent, canActivate: [IsLogedOutService]},
  { path: 'user', component: UserComponent, canActivate: [IsLoggedInService]},
  { path: 'users', component: UsersListComponent, canActivate: [IsLoggedInService]},

  { path: 'contracts', component: ContractListComponent, canActivate: [IsLoggedInService] },
  { path: 'contract/:id', component: ContractShowComponent, canActivate: [IsLoggedInService] },
  { path: 'contracts/create', component: CreateContractComponent, canActivate: [IsLoggedInService] },
  { path: 'contract/:id/edit', component: CreateContractComponent, canActivate: [IsLoggedInService] }
];

export const  routing = RouterModule.forRoot(APP_ROUTES);
