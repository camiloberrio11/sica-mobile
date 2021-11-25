import { ToolByBarcodeResponseService } from './Tool';

export interface CreateLoanBody {
  deliveredBy: string;
  receivedBy: string;
  quantity: number;
  days: number;
  tasks: string;
  remark: string;
  tool: string;
}

export interface UpdateLoanBody {
  return: {
    deliveredBy: string;
    receivedBy: string;
    detail: {
      status: string;
      quantity: number;
    };
    remark: string;
  };
}

export interface Loan {
  id: string;
  date: string;
  deliveredBy: DeliveredBy;
  receivedBy: ReceivedBy;
  quantity: number;
  days: number;
  tasks: string;
  remark: string;
  tool: ToolByBarcodeResponseService;
  return: Return[];
}

interface Return {
  date: string;
  deliveredBy: ReceivedBy;
  receivedBy: DeliveredBy;
  detail: {
    status: string;
    quantity: number;
  };
  remark: string;
}

interface DeliveredBy {
  id: string;
  name: {
    first: string;
    last: string;
  };
  username: string;
  email: string;
  department: string;
  city: string;
  token: string;
  document: string;
}

interface ReceivedBy {
  id: string;
  name: {
    first: string;
    last: string;
  };
  document: string;
  phone: string;
  email: string;
  constructions: { id: string }[];
  level: number;
  specialPermissions: any[];
  isContractor: boolean;
  token: string;
}
