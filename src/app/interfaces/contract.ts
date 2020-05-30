export interface Contract {
  id?: number;
  title?: string;
  typeId?: number;
  temporary?: boolean;
<<<<<<< HEAD
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
=======
  endDate?: string;
  originalAtTeamAssistant?: boolean;
  rating?: number;
  ratingBg?: string;
  submittingPersonId?: number;
  singedDate?: string;
  customerId?: number;
>>>>>>> 4348fe969dc5d14656fdd6aadf76522d855e84f2
}
