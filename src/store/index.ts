import {makeAutoObservable, observable} from 'mobx';
import {createContext, useContext} from 'react';
import Auth from './_/auth.store';
import Countries from './_/countries.store';

export default class Store {
  // ...
  private _state: any;
  auth: Auth;
  countries: Countries;

  constructor() {
    makeAutoObservable(this);
    this._state = observable.box({});
    this.auth = new Auth(this);
    this.countries = new Countries(this);
  }

  set state(state: any) {
    this._state.set(state);
  }
}

export const StoreContext = createContext<Store | null>(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

export const initializeStore = (initialState: any = null) => {
  const store = new Store();

  if (initialState) {
    store.state = initialState;
  }

  return store;
};
