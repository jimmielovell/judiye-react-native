import {IOwner} from './models';
import Account from './store.account';
import Profile from './store.profile';

export default class Owner extends Account {
  constructor(user: IOwner) {
    super(user);
  }

  get profiles() {
    return Profile;
  }
}
