import {Email, Phone} from 'domains';
import {makeAutoObservable} from 'mobx';
import Store from 'store';

export default class Auth {
  rootStore: Store;

  method: 'email' | 'phone' | 'google' = 'email';
  token: string = '';

  email: Email | null = null;
  phone: Phone | null = null;

  loggedIn: boolean = true;

  constructor(rootStore: Store) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setToken(token: string) {
    this.token = token;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  loginWithEmail(email: Email) {
    this.method = 'email';
    this.email = email;
    this.phone = null;
  }

  loginWithPhone(phone: Phone) {
    this.method = 'phone';
    this.phone = phone;
    this.email = null;
  }

  loginWithGoogle() {
    this.method = 'google';
    this.phone = null;
    this.email = null;
  }
}
