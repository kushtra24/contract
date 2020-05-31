import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Contract} from '../../interfaces/contract';
import {ContractService} from '../../services/contract/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})

export class ContractListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'endDateConverted', 'signedDateConverted', 'customerName'];

  dataSource: MatTableDataSource<Contract>;

  contract: Contract;
  isLoading: boolean;
  // details page
  contractDetailBaseLink: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  contractList: Contract[];

  /**
   * the constructor
   */
  constructor(protected router: Router,
              private contractService: ContractService) {
    this.reset();
  }

  /**
   * ng on init
   */
  ngOnInit(): void {

    this.subscribeToEvents();

    // if the contract list is empty then do not paginate
    if (this.contractList.length) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }


  /**
   * reset
   */
  reset() {
    this.contract = {};
    this.contractList = [];
    this.isLoading = false;
    // contract details page
    this.contractDetailBaseLink = '/contract/';
  }

  private subscribeToEvents() {

    this.isLoading = true;
    this.contractService.getBackendContracts()
      .subscribe( (result: Contract[]) => {
        this.isLoading = false;
        this.contractList = result;

        // Create 100 contractItems
        const contractItems = this.contractList;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(contractItems);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    // this.contractService.

  }

  /**
   * apply fillter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  /**
   * Go to the contract details page
   */
  onContractShow(contractId: number) {
    // TODO: undo this comment
    if (!contractId || !this.router) { return; }
    this.router.navigate([this.contractDetailBaseLink + contractId]);
  }

}


