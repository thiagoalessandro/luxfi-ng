export class RequestErrorException extends Error {

  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, RequestErrorException.prototype);
  }

}
