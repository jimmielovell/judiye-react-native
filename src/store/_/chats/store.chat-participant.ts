import Profile from '../users/store.profile';
import {IChatParticipant} from './models';

export default class ChatParticipants {
  private _participants: ChatParticipant[] = [];

  constructor() {}

  get participants(): ChatParticipant[] {
    return this._participants;
  }
}

export class ChatParticipant extends Profile {
  constructor(participant: IChatParticipant) {
    super(participant);
  }
}
