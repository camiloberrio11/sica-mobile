export interface ToolResponseService {
    id: string;
    construction: Construction;
    invoices: Invoice[];
    trademark: Trademark;
    category: Category;
    profile: Trademark;
    barcode: string;
    image: string;
    reference: string;
    serial: string;
    isOwned: boolean;
    warrantyExpirationDate: string;
  }

  interface Category {
    id: string;
    name: string;
    isUnity: boolean;
  }

  interface Trademark {
    id: string;
    name: string;
  }

  interface Invoice {
    id: string;
    type: string;
    date: string;
    warranty: number;
    construction: Construction2;
    supplier: Construction2;
  }

  interface Construction2 {
    id: string;
  }

  interface Construction {
    id: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  }

