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
