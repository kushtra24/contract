import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ContractType} from '../../interfaces/type';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Contract} from '../../interfaces/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractTypesService {

  contractType: ContractType;
  typeList: ContractType[];

  constructor(
    private http: HttpClient
  ) { }



  /**
   * check if contracts exist
   */
  loadTypes() {

    return new Observable( observer => {
      if (this.typeList) {
        return observer.next(this.typeList);
      } else {
        this.loadBackendTypes().subscribe( (data: Contract[]) => {
          return observer.next(this.typeList);
          });
      }
    });
  }

  /**
   * Load types from backend
   */
  loadBackendTypes() {
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
