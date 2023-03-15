import {IUser} from './models';
import User from './store.account';

export default class Colleagues {
  private _colleagues: Colleague[] = [];

  /**
   * The list of suggested colleagues
   * @returns {Colleague[]}
   */
  get suggestions(): Colleague[] {
    return this._colleagues;
  }

  /**
   * The list of colleagues that have requested to be added to the owner's
   * contact list
   * @returns {Colleague[]}
   */
  get requests(): Colleague[] {
    return this._colleagues;
  }
}

export class Colleague extends User {
  constructor(user: IUser) {
    super(user);
  }
}
