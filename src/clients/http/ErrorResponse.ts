export class ErrorResponse extends Error {
  readonly status: number;

  constructor(error: { message: string; status: number }) {
    super(error.message);
    this.status = error.status;
  }
}
