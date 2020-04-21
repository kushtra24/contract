import {Injectable} from '@angular/core';
import {Contract} from '../../interfaces/contract';
import {Observable} from 'rxjs';
import {Customer} from '../../interfaces/customer';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Project} from '../../interfaces/project';
import {Person} from '../../interfaces/Person';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract: Contract;
  customer: Customer[];
  project: Project[];
  people: Person[];
  linked: Contract[];

  env = environment.api;


  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * get customers from the backend
   * @param search search a customer
   */
  loadCustomer(search: any) {
    return new Observable(observer => {

      if (this.customer && this.customer.length) {
        return observer.next(this.customer);
      }

      const url = this.env + 'api/customers?search=' + search;

      this.http.get(url)
        .subscribe((data: Customer[]) => {
          console.log('customerDataserv - ', data);
          if (!data) {
            return observer.next([]);
          }
          this.customer = data;
          return observer.next(this.customer);
        });
    }).pipe(first());
  }

  /**
   * get all projects from backend
   * @param search for projects
   */
  loadProjects(search: any) {
    return new Observable(observer => {

      if (this.project && this.project.length) {
        return observer.next(this.customer);
      }

      const url = this.env + 'api/projects?search=' + search;

      this.http.get(url)
        .subscribe((projectData: Project[]) => {
          if (!projectData) {
            return observer.next([]);
          }
          this.project = projectData;
          return observer.next(this.project);
        });
    }).pipe(first());
  }

  /**
   * get all people from backend
   */
  getPeople(search?: string) {
    return new Observable(observer => {

      if (this.people && this.people.length) {
        return observer.next(this.people);
      }
      if (!search) { search = ''; }

      const url = this.env + 'api/people?search=' + search;

      this.http.get(url)
        .subscribe( (data: Person[]) => {
          this.people = data;
          return observer.next(this.people);
        }, error => {
          throw error;
        });
    });
  }

  /**
   * get all contracts
   */
  getContracts(search: string) {

    return new Observable( observer => {
      if (this.linked && this.linked.length) { return observer.next(this.linked); }

      const url = this.env + 'api/contracts?search=' + search;

      this.http.get(url)
        .subscribe( (data: Contract[]) => {
          this.linked = data;
          return observer.next(this.linked);
        }, error => {
          throw error;
        });
    });
  }

}
