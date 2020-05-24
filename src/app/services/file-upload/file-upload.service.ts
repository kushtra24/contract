import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Contract} from '../../interfaces/contract';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  contract: Contract;
  env = environment.api;

  constructor(private http: HttpClient) { }


  /**
   * get file details
   * @param id contract id
   */
  getDetails(id: number) {
    return new Observable( observer => {

      const url = this.env + 'api/files/' + id;

      this.http.get(url)
        .subscribe( (data: any) => {
               return observer.next(data);
      });
    }).pipe(first());
  }

}
