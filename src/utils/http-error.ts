export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly data: object;

  constructor(statusCode: number, message: string, data: object = {}) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
