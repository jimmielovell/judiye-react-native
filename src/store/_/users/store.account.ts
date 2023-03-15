import {IAccount} from './models';

export default class Account {
  account_id: string;
  fullname: string;

  constructor(user: IAccount) {
    this.account_id = user.account_id;
    this.fullname = user.fullname;
  }
}
