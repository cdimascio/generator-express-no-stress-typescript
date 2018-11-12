import * as HttpStatus from 'http-status-codes';

export class CustomError extends Error {
  inner: Error;
  status: number;

  constructor(message: string, inner: Error, status: number) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.inner = inner;
    this.status = status;
  }
}

export class HttpError extends CustomError {
  constructor(httpErrorCode: number, inner?: Error) {
    super(HttpStatus.getStatusText(httpErrorCode), inner, httpErrorCode);
  }
}