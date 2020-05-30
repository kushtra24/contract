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


<<<<<<< HEAD
  constructor(private http: HttpClient) {}
=======
  constructor(
    private http: HttpClient
  ) {
  }
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2

  /**
   * get customers from the backend
   * @param search search a customer
   */
  loadCustomer(search: any) {
    return new Observable(observer => {

<<<<<<< HEAD
      // if (this.customer && this.customer.length && !search) {
      //   return observer.next(this.customer);
      // }
=======
      if (this.customer && this.customer.length) {
        return observer.next(this.customer);
      }
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2

      const url = this.env + 'api/customers?search=' + search;

      this.http.get(url)
        .subscribe((data: Customer[]) => {
<<<<<<< HEAD
=======
          console.log('customerDataserv - ', data);
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2
        });
    }).pipe(first());
  }

  /**
<<<<<<< HEAD
   *  get all people from the backend
   * @param search string
=======
   * get all people from backend
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2
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
<<<<<<< HEAD
    }).pipe(first());
  }


  /**
   *  get all contracts from the backend
   * @param search string
   */
  getContracts() {
=======
    });
  }

  /**
   * get all contracts
   */
  getContracts(search: string) {
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2

    return new Observable( observer => {
      if (this.linked && this.linked.length) { return observer.next(this.linked); }

<<<<<<< HEAD
      const url = this.env + 'api/contracts';
=======
      const url = this.env + 'api/contracts?search=' + search;
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2

      this.http.get(url)
        .subscribe( (data: Contract[]) => {
          this.linked = data;
          return observer.next(this.linked);
        }, error => {
          throw error;
        });
<<<<<<< HEAD
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

=======
    });
  }

>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2
}
