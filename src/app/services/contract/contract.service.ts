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
  contracts: Contract[];

  env = environment.api;

  constructor(private http: HttpClient) {}


  /**
   * get customers from the backend
   * @param search search a customer
   */
  getCustomer(search: any) {
    return new Observable(observer => {
      // if (this.customer && this.customer.length && !search) {
      //   return observer.next(this.customer);
      // }
      const url = this.env + 'api/customers?search=' + search;

      this.http.get(url)
        .subscribe((data: Customer[]) => {
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
  loadProjects() {
    return new Observable(observer => {
      if (this.project && this.project.length) { return observer.next(this.project); }

      const url = this.env + 'api/projects';

      this.http.get(url)
        .subscribe((projectData: Project[]) => {
          this.project = projectData;
          return observer.next(this.project);
        }, error => {
          throw error;
        });
    }).pipe(first());
  }

  /**
   *  get all people from the backend
   * @param search string
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
    }).pipe(first());
  }


  /**
   * check if contracts exist
   */
  getContracts() {
    return new Observable( observer => {
      if (this.contract) {
        return observer.next(this.contract);
      } else {
        this.getBackendContracts();
      }
    });
  }


  /**
   *  get all contracts from the backend
   * @param search string
   */
  getBackendContracts() {
    return new Observable( observer => {

      const url = this.env + 'api/contracts';

      this.http.get(url)
        .subscribe( (data: Contract[]) => {
          this.contracts = data;
          return observer.next(this.contracts);
        }, error => {
          throw error;
        });
    }).pipe(first());
  }

  /**
   * create a new contract
   * @param contract model
   */
  createContract(contract: Contract) {
    return new Observable( observer => {

      if (!contract || contract === {} ) { return observer.error(); }

      this.convertDates(contract);


      return this.http.post(this.env + 'api/contracts', contract)
        .subscribe((data: any) => {
          return observer.next(data);
        }, error => {
          return observer.error(error);
        });
    });
  }


  /**
   * update a contract
   * @param contract id
   */
  updateContract(contract: Contract) {
    return new Observable( observer => {

      if (!contract || contract === {}) { return observer.error(); }

      this.convertDates(contract);

      return this.http.put(this.env + 'api/contracts/' + contract.id, contract)
        .subscribe( (data: Contract) => {
          return observer.next(data);
        }, err => {
          return observer.error(err);
        });
    });
  }

  /**
   * convert signDate and endDate
   * @param contract interface
   */
  convertDates(contract) {

    const signedDate = new Date(contract.signedDate);
    contract.signedDate = signedDate.getFullYear() + '-' + (signedDate.getMonth() + 1) + '-' + signedDate.getDate();

    const endDate = new Date(contract.endDate);
    contract.endDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
  }


  /**
   * get the details of contract
   * @param id contract
   */
  loadContractDetails(id: number) {
    return new Observable( observer => {
          const url = this.env + 'api/contracts/' + id;

          this.http.get(url)
            .subscribe((data: Contract) => {
              return observer.next(data);
            });
    }).pipe(first());
  }

}
