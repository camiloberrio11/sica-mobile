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



