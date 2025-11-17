export interface ApiErrorData {
  [key: string]: any;
}

export class ApiError extends Error {
  public readonly type: string;
  public readonly status: number;
  public readonly timestamp?: string;
  public readonly data?: ApiErrorData;
  public readonly subcode?: number;

  constructor(params: {
    type: string;
    status: number;
    message: string;
    timestamp?: string;
    data?: ApiErrorData;
    subcode?: number;
  }) {
    super(params.message);
    this.name = params.type;
    this.type = params.type;
    this.status = params.status;
    this.timestamp = params.timestamp;

    if (params.data) {
      this.data = params.data;
    }

    if (params.subcode) {
      this.subcode = params.subcode;
    }
  }
}
