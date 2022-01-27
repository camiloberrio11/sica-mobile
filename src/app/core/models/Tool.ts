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

export interface CreateToolBody {
  invoice: {
    date: string;
    number: number;
    supplier: string;
    price: number;
    warranty: number;
  };
  tool: {
    image: string;
    barcode: string;
    reference: string;
    serial: string;
    category: string;
    brand: string;
    profile: string;
  };
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


export interface BodyTakeBackRentedTool {
  ids: IdToolBodyTakeBackRentedTool[];
  remission: string;
  remark: string;
  deliveredBy: string;
  realAnnouncedDate: string;
  supplier: string;
}

export interface IdToolBodyTakeBackRentedTool {
  returnIdBySupplier: string;
  quantity: number;
  category: string;
}

