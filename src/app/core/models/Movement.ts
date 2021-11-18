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
