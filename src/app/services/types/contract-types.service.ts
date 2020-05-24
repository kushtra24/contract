import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ContractType} from '../../interfaces/type';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractTypesService {

  typeList: ContractType[];

  constructor(
    private http: HttpClient
  ) { }

  loadTypes() {
    return new Observable(observer => {
      // if (this.typeList && this.typeList.length) {
      //   return observer.next(this.typeList);
      // }
      const env = environment.api;

      const url = env + 'api/contract-types';

      this.http.get(url)
        .subscribe((data: ContractType[]) => {
          if (!data) {
            return observer.next([]);
          }
          this.typeList = data;
          return observer.next(this.typeList);
        });
    }).pipe(first());
  }

}
