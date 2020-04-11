import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './routes/user/user.component';
import {HomeComponent} from './routes/home/home.component';
import {ContractListComponent} from './routes/contract-list/contract-list.component';
import {CreateContractComponent} from './routes/create-contract/create-contract.component';
import {ContractShowComponent} from './routes/contract-show/contract-show.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent },
  { path: 'contracts', component: ContractListComponent },
  { path: 'contract/:id', component: ContractShowComponent },
  { path: 'contracts/create', component: CreateContractComponent }
];

export const  routing = RouterModule.forRoot(APP_ROUTES);
