import {CountryCode, parsePhoneNumberWithError} from 'libphonenumber-js';
import {ParseError} from './errors';

export class Email {
  private readonly value: string;

  constructor(_value: string) {
    if (!this.startsWithLetter(_value)) {
      throw new ParseError('Email must start with a letter');
    }

    _value = _value.toLowerCase().trim();

    if (!this.isValid(_value)) {
      throw new ParseError('Invalid email');
    }

    this.value = _value;
  }

  private isValid(value: string): boolean {
    return (
      value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) !== null
    );
  }

  private startsWithLetter(value: string): boolean {
    return value.match(/^[a-zA-Z]+.*/) !== null;
  }

  toString(): string {
    return this.value;
  }
}

export class Phone {
  private readonly value: string;
  private readonly phonenumber;

  constructor(_value: string, _countryCode: CountryCode = 'KE') {
    let phonenumber = parsePhoneNumberWithError(_value, _countryCode);

    if (!phonenumber.isValid()) {
      throw new ParseError('Invalid phone number');
    }

    this.value = _value;
    this.phonenumber = phonenumber;
  }

  get countryCode(): string {
    return this.phonenumber.countryCallingCode;
  }

  get number(): string {
    return this.value;
  }

  get national(): string {
    return this.phonenumber.formatNational();
  }

  get international(): string {
    return this.phonenumber.formatInternational();
  }

  toString(): string {
    return this.phonenumber.formatInternational();
  }
}

export class Pin {
  private readonly value: string;

  constructor(_value: string) {
    if (!this.isValid(_value)) {
      throw new ParseError('Invalid pin');
    }

    this.value = _value;
  }

  private isValid(value: string): boolean {
    return value.match(/^\d{6}$/) !== null;
  }

  toString(): string {
    return this.value;
  }
}
