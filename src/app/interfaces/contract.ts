export interface Contract {
  id?: number;
  title?: string;
  typeId?: number;
  temporary?: boolean;
  signedDate?: string;
  signedDareConverted?: string;
  endDate?: string;
  endDateConvert?: string;
  isOriginal?: boolean;
  customerId?: number | string;
  projectId?: number[];
  personId?: number[];
  customerName?: string;
  linkedContractsId?: number[];
  linkedContracts?: any[];
  projects?: any[];
  people?: any[];
  contractType?: string;
}
