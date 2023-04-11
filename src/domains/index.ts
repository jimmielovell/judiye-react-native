import {CountryCode, parsePhoneNumberWithError} from 'libphonenumber-js';

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

  constructor(_value: string, length: number = 6) {
    if (!this.isValid(_value, length)) {
      throw new ParseError('Invalid pin');
    }

    this.value = _value;
  }

  private isValid(value: string, length: number): boolean {
    const regex = new RegExp(`^[0-9]{${length}}$`);

    return regex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export class CDate {
  private input: {year: number; month: number; day: number};
  private readonly value: Date;

  constructor(year: number, month: number, day: number) {
    if (!this.isMonthValid(month)) {
      throw new ParseError('Invalid month');
    }

    if (!this.isDayValid(day)) {
      throw new ParseError('Invalid day');
    }

    const date = new Date(year, month, day);
    this.value = date;
    this.input = {year, month, day};
  }

  isLessThan(date: Date): boolean {
    return this.value.getTime() < date.getTime();
  }

  isLessThanCurrentDate(): boolean {
    const date = new Date();
    return this.value.getTime() < date.getTime();
  }

  isGreaterThan(date: CDate): boolean {
    return this.value.getTime() > date.value.getTime();
  }

  isGreaterThanCurrentDate(): boolean {
    const date = new Date();
    return this.value.getTime() > date.getTime();
  }

  yearsElapsed(date: CDate): number {
    return date.value.getFullYear() - this.value.getFullYear();
  }

  monthsElapsed(date: CDate): number {
    return (
      this.yearsElapsed(date) * 12 +
      date.value.getMonth() -
      this.value.getMonth()
    );
  }

  daysElapsed(date: CDate): number {
    return date.value.getDate() - this.value.getDate();
  }

  private isMonthValid(month: number): boolean {
    return month > 0 && month < 13;
  }

  private isDayValid(day: number): boolean {
    return day > 0 && day < 32;
  }

  toString(): string {
    return this.value.toISOString();
  }

  toObject(): {year: number; month: number; day: number} {
    return this.input;
  }
}
