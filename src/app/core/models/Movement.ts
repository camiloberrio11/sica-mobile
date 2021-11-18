import { Construction } from './Construction'
import { Reason } from './Reason'
import { ToolByBarcodeResponseService } from './Tool'
import { User } from './User'

export interface SendEToolBody {
  reason: string;
  devolutionEstimatedDate: string;
  origin: {
    user: string;
    construction: string;
  };
  destination: {
    construction: string;
  };
  tool: string;
}


export interface ReceiveToolBody {
  destination: {
    user: string;
  };
}
export interface Movement {
  id: string;
  reason: Reason;
  devolutionEstimatedDate: string;
  date: string;
  receiptDate: string;
  origin: {
    user: User;
    construction: Construction;
  };
  destination: {
    user: User;
    construction: Construction;
  };
  tool: ToolByBarcodeResponseService;
}
