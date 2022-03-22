export interface WorkerSica {
  id: string;
  name: Name;
  document: string;
  phone: string;
  email: string;
  constructions: Construction[];
  level: number;
  specialPermissions: any[];
  contractor: Contractor;
  isContractor: boolean;
  token: string;
}

interface Contractor {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  personType: string;
}

interface Construction {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Name {
  first: string;
  last: string;
}
