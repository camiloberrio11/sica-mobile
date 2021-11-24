import { Supplier } from './Supplier';
import { ToolByBarcodeResponseService } from './Tool';

export interface Maintenance {
  id: string;
  date: string;
  price: number;
  remark: string;
  invoice: Invoice;
  supplier: Supplier;
  construction: {
    id: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  tool: ToolByBarcodeResponseService;
  return: {
    date: string;
    remark: string;
  }[];
}

interface Invoice {
  id: string;
  number: number;
  price: number;
  type: string;
  date: string;
  warranty: number;
  construction: { id: string }[];
  supplier: { id: string }[];
}


export interface MaintenanceBodyCreate {
  invoice: {
    date: string;
    number: number;
    supplier: string;
    price: number;
    warranty: number;
  };
  remark: string;
  construction: string;
  tool: string;
}
