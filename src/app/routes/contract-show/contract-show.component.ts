import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ContractService} from '../../services/contract/contract.service';
import {Contract} from '../../interfaces/contract';
import {FileUploadService} from '../../services/file-upload/file-upload.service';
import {File} from '../../interfaces/file';
import {AuthService} from '../../services/auth/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contract-show',
  templateUrl: './contract-show.component.html',
  styleUrls: ['./contract-show.component.css']
})
export class ContractShowComponent implements OnInit {

  isLoading: boolean;
  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  contractId: number;
  contract: Contract;
  fileDetails: File;
  env = environment.api;
  userToken: string;

  constructor( private route: ActivatedRoute,
               private contractService: ContractService,
               private fileService: FileUploadService,
               private router: Router,
               private auth: AuthService) {
    this.reset();
  }

  private reset() {
    this.contract = {};
    this.fileDetails = {};
    this.userToken = this.auth.getAuthToken();
  }

  ngOnInit(): void {
    this.subscribeToEvents();
  }


  /**
   * subscribe to events
   */
  private subscribeToEvents() {

    // get detail data from contract
      this.route.params
        .subscribe((params: Params) => {
          this.contractId = +params.id;
          this.getContractDetails(this.contractId);
          this.getFileDetails(this.contractId);
        }, err => {
          this.isLoading = false;
          throw err;
        });

  }


  /**
   * get contract details
   * @param contractId contract id
   */
  private getContractDetails(contractId: number) {
      if (!this.contractId) { return; }

      this.isLoading = true;
      this.contractService.loadContractDetails(this.contractId)
        .subscribe( (contractDetails: Contract) => {
          this.isLoading = false;
          this.contract = contractDetails;
        }, err => {
          this.isLoading = false;
          throw err;
        });
  }

  /**
   * get contract file details
   * @param id contract id
   */
  private getFileDetails(id: number) {
    this.isLoading = true;

    if (!id) { return; }

    this.fileService.getDetails(id)
      .subscribe( (file: File) => {
        this.isLoading = false;
        this.fileDetails = file;
      }, err => {
        this.isLoading = false;
        throw err;
      });
  }

  /**
   * Navigate to given router
   * @param contractId id
   */
  navigateToRoute(contractId: number) {
    if (!contractId || !this.router) { return; }

    this.router.navigateByUrl('/contract/' + contractId + '/edit');
  }

}
