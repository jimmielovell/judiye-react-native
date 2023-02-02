import {makeAutoObservable} from 'mobx';
import Store from 'store';

export interface ICountry {
  name: string;
  iso: string;
  phone: string;
}

export default class Countries {
  rootStore: Store;

  countries: Country[] = [];

  constructor(rootStore: Store) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  async fetchCountries() {
    // const countries = await fetchCountries();
    // runInAction(() => {
    //   this.countries = countries;
    // });
  }

  getCountryByIso(iso: string) {
    return this.countries.find(country => country.iso === iso);
  }

  getCountryByPhone(phone: string) {
    return this.countries.find(country => country.phone === phone);
  }

  getCountryByName(name: string) {
    return this.countries.find(country => country.name === name);
  }
}

export class Country {
  name: string;
  iso: string;
  phone: string;

  constructor(store: Countries, data: ICountry) {
    this.name = data.name;
    this.iso = data.iso;
    this.phone = data.phone;

    makeAutoObservable(this);
  }
}
