import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE, ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ContractType} from '../../interfaces/type';
import {ContractTypesService} from '../../services/types/contract-types.service';
import {Customer} from '../../interfaces/customer';
import {ContractService} from '../../services/contract/contract.service';
import {Project} from '../../interfaces/project';
import {Person} from '../../interfaces/Person';
import {Contract} from '../../interfaces/contract';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FileUploader} from 'ng2-file-upload';
import {FileUploadService} from '../../services/file-upload/file-upload.service';
import {File} from '../../interfaces/file';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-De'},
  ],
})
export class CreateContractComponent implements OnInit {

  contractInterface: Contract;
  @Input() form: NgForm;

  @ViewChild('typeInput', {static: true})

  isLoading: boolean;
  submitLoading: boolean;
  maxDate: Date;
  minDate: Date;

  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;


  // type
  typeSelected: ContractType[];
  isLoadingTypes: boolean;

  submitted: boolean;
  // customer
  customerloading: boolean;
  customerList: Customer[];
  searchedCustomer: string;
  customerSearchSubject: Subject<any>;
  projectSearchSubject: Subject<any>;
  customer: Customer;

  // project
  projectList: Project[];
  projectIds: Project[];
  projectLoading: boolean;
  projectListIsOpen: boolean;

  // additional people
  additionalPeopleList: Person[];
  personId: Person[];
  peopleLoading: boolean;
  isOpen: boolean;

  // linked
  linkedList: Contract[];
  linkedContracts: Contract[];
  linkedLoading: boolean;
  linkedIsOpen: boolean;

  // upload
  fileToUpload: File;
  isUploading: boolean;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  title: string;
  type: ContractType;

  // edit
  isEditMode: boolean;


  /**
   * constructor
   * @param contractTypesService type service
   * @param contractService service
   * @param router navigation
   * @param route activated route
   * @param fileService files
   * @param _adapter adapter
   */
  constructor(
    private contractTypesService: ContractTypesService,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileUploadService,
    // tslint:disable-next-line:variable-name
    private _adapter: DateAdapter<any>,
  ) {
    this.reset();
  }

  /**
   * Reset variable from constrictor
   */
  private reset() {
    this.customer = {};

    this.contractInterface = {
      isOriginal: false,
      temporary: false,
      projectId: [],
      personId: [],
      linkedContractsId: []
    };

    // title
    this.title = '';
    // page loading
    this.isLoading = false;
    // loading on submit
    this.submitLoading = false;
    // selected contract type
    this.typeSelected = null;
    // loading on getting customers form selection
    this.customerloading = false;
    // loading on getting projects list on selection
    this.projectLoading = false;
    // customer list reset
    this.customerList = [];
    // project list
    this.projectList = [];
    // is open projet list
    this.projectListIsOpen = false;
    // additional people list
    this.additionalPeopleList = [];
    // linked contracts list
    this.linkedList = [];
    // customer searching subject
    this.customerSearchSubject = new Subject<any>();
    // project searching subject
    this.projectSearchSubject = new Subject<any>();
    // file upload
    this.fileToUpload = null;
    const options = {};
    this.uploader = new FileUploader(options);
    this.hasBaseDropZoneOver = false;
    // is uploading pdf contract file
    this.isUploading = false;

    // datepicker format change to locale
    this._adapter.setLocale('de');
    // people loading
    this.peopleLoading = false;

    // datepicker max and min date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    this.minDate = new Date(currentYear, currentMonth, currentDay);
  }

  /**
   * ng On init
   */
  ngOnInit(): void {
    this.loadContractTypesData();
    this.subscribeToEvents();
  }


  /**
   * subscribe to events
   */
  private subscribeToEvents() {

    // show results when the user searches
    this.customerSearchSubject
      .pipe(
        debounceTime(300),
        switchMap((searchString: string) => {
          return this.contractService.loadCustomer(searchString);
        })
      )
      .subscribe(
        (customers: Customer[]) => {
          this.customerloading = false;
          this.customerList = customers;
        }
      );

    // check if is in edit mode or not
    this.route.params.subscribe(params => {
      this.contractInterface.id = +params.id;
      this.getContractDetails(this.contractInterface.id);
      this.getFileDetails(this.contractInterface.id);
    }, err => {
      this.isLoading = false;
    });
  }

  /**
   * load the contract types data
   */
  private loadContractTypesData() {
    this.isLoadingTypes = true;
    this.contractTypesService.loadTypes()
      .subscribe((data: ContractType[]) => {
        this.typeSelected = data;
        this.isLoadingTypes = false;
      });
  }


  /**
   * filter customers based on given filter value
   * @param search customers
   */
  getCustomers(search: string) {

    if (!search) {
      search = '';
    } else {
      search = search + '';
    }

    this.customerloading = true;
    const fillteredItem = search.split(' ');

    this.contractService.loadCustomer(fillteredItem)
      .subscribe((customerResult: Customer[]) => {
          this.customerloading = false;
          this.customerList = customerResult;
        },
        err => {
          this.customerloading = false;
          throw err;
        });
  }

  /**
   * @param search search projects
   */
  getProjects() {

    this.projectListIsOpen = true;
    this.projectLoading = true;

    this.contractService.loadProjects()
      .subscribe((projectResult: Project[]) => {
        this.projectList = projectResult;
        this.projectLoading = false;
      }, err => {
        this.projectLoading = false;
        throw err;
      });
  }

  /**
   * linked contract for the multi select list
   * @param search user input
   */
  getContracts() {

    this.linkedIsOpen = true;
    this.linkedLoading = true;

    this.contractService.getContracts()
      .subscribe((rez: Contract[]) => {
        this.linkedList = rez;
        this.linkedLoading = false;
      }, error => {
        this.linkedLoading = false;
        throw error;
      });
  }

  /**
   * change the search string after user searches
   * @param value search string
   */
  customerOnChange(value) {
    if (!value) {
      return;
    }
    this.searchedCustomer = value;
    this.customer = value;
    this.contractInterface.customerId = value.id;
    // loading to on
    this.customerloading = true;
    // autocomplete search
    this.customerSearchSubject.next(value);
    // creat the contract title
    this.createTitle();
  }

  /**
   * create the contract title
   */
  createTitle() {
    if (this.customer.name && this.type?.name) {
      this.title = this.customer.name + '-' + this.type?.name;
    } else {
      console.log('no title for you this time');
    }
    this.contractInterface.title = this.title;
  }


  /**
   * get name of
   * @param customer object
   */
  customerCollectionDisplayFn(customer) {
    return customer?.name;
  }

  /**
   * Create contract
   * @param form of contract
   * @param event event from contract form
   */
  createContract(form: any, event: Event) {

    this.submitted = true;

    // project filling
    if (this.projectIds != null) {
      for (const project of this.projectIds) {
        this.contractInterface.projectId.push(project.id);
      }
    }

    // additional people filling
    if (this.personId != null) {
      for (const additionalPerson of this.personId) {
        this.contractInterface.personId.push(additionalPerson.id);
      }
    }

    // linked contract filling
    if (this.linkedContracts != null) {
      for (const linkedContract of this.linkedContracts) {
        this.contractInterface.linkedContractsId.push(linkedContract.id);
      }
    }

    if (this.contractInterface.temporary === false) {
      const newSignedDate = new Date(this.contractInterface.signedDate);
      this.contractInterface.endDate = new Date(newSignedDate.setFullYear(newSignedDate.getFullYear() + 10)).toString();
    }

    // create contract
    this.contractService.createContract(this.contractInterface)
      .subscribe((contract: Contract) => {
        if (contract && contract.id) {
          this.uploadFiles(contract.id);
        } else {
          this.router.navigate(['contracts/']);
        }
        // this.router.navigate(['contracts/']);
      }, error => {
        this.submitted = false;
        throw error;
      });
  }

  /**
   * upload the files
   * @param id oc contract to link the file with
   */
  private uploadFiles(id: number) {

    // early out
    if (!id) { return; }

    this.isUploading = true;

    // for every upload queue get the files
    for (let i = 0, max = this.uploader.queue.length; i < max; i++) {
      // get a queue for every entity
      const file = this.uploader.queue[i];
      // early out
      if (!file) { continue; }
      // get the url of the endpoint
      file.url = environment.api + 'api/files/' + id;
      // upload the files
      file.upload();

      file.onSuccess = () => {
        this.isUploading = false;
        file.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);  // 1s
      };

      file.onError = () => {
        this.isUploading = false;
      };
      this.isUploading = false;
      // this.updateView();
    }
  }


  /**
   * file over base
   * @param event zone drop
   */
  public fileOverBase(event: any) {
    this.hasBaseDropZoneOver = event;
  }

  /**
   * get all additional people
   * @param event sent from form
   */
  getAdditionalPeople(event) {
    this.isOpen = event;
    this.peopleLoading = true;
    this.contractService.getPeople()
      .subscribe((peopleResult: Person[]) => {
        this.peopleLoading = false;
        this.additionalPeopleList = peopleResult;
      }, error => {
        this.peopleLoading = false;
        throw error;
      });
  }


  /**
   * set the contract type
   * @param value type object
   */
  setContractType(value: any) {
    this.type = value;
    this.contractInterface.typeId = value.id;
    this.createTitle();
  }

  /**
   * get details of a contract
   * @param id contract
   */
  private getContractDetails(id: number) {
    if (!id) { return; }

    this.isLoading = true;
    this.contractService.loadContractDetails(id)
      .subscribe( (rez: Contract) => {
        this.isLoading = false;
        this.isEditMode = true;
        this.contractInterface = rez;
      }, err => {
        this.isLoading = false;
        throw err;
      });
  }

  /**
   * get details of a file
   * @param id file
   */
  private getFileDetails(id: number) {
    if (!id) { return; }

    this.isLoading = true;
    this.fileService.getDetails(id)
      .subscribe( (date: File) => {
        this.isLoading = false;
        this.fileToUpload = date;
      }, err => {
        this.isLoading = false;
      });
  }

}
