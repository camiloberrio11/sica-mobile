export interface SaveRentedToolBody {
  remission: {
    number: number;
    dailyPrice: number;
    rentedFrom: string;
    estimatedRentalDays: number;
    supplier: string;
  };
  tool: {
    idBySupplier: string;
    quantity: number;
    usedFor: string;
    image: string;
    category: string;
  };
}
export interface RentedTool {
  id: string;
  remission: Remission;
  construction: Construction;
  supplier: Supplier;
  category: Category;
  idBySupplier: string;
  dailyPrice: number;
  quantity: number;
  estimatedRentalDays: number;
  usedFor: string;
  image: string;
}

interface Supplier {
  id: string;
  nit: string;
  name: string;
  type: string[];
}

interface Construction {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Category {
  id: string;
  barcode: string;
  name: string;
  level: number;
  isUnit: boolean;
  specialPermissions: { id: string }[];
}

interface Remission {
  id: string;
  number: number;
  rentedFrom: string;
  construction: { id: string }[];
  supplier: { id: string }[];
}
