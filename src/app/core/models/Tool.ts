export interface ToolByBarcodeResponseService {
  id: string;
  invoices: Invoice[];
  construction: Construction;
  brand: Brand;
  category: Category;
  profile: Brand;
  barcode: string;
  image: string;
  reference: string;
  serial: string;
  warrantyExpirationDate: string;
}

interface Category {
  id: string;
  barcode: string;
  name: string;
  level: number;
  isUnit: boolean;
  specialPermissions: ConstructionId[];
}

interface Brand {
  id: string;
  name: string;
}

interface Construction {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Invoice {
  id: string;
  number: number;
  price: number;
  type: string;
  date: string;
  warranty: number;
  construction: ConstructionId;
  supplier: ConstructionId;
}

interface ConstructionId {
  id: string;
}
