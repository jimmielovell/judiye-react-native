export class ParseError {
  constructor(public message: string) {
    this.message = message;
  }
}

export class ValidationError {
  constructor(public message: string) {
    this.message = message;
  }
}
