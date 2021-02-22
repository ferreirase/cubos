interface DataError {
  message: string;
  statusCode: number;
}

export default class Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor({ message, statusCode }: DataError) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
