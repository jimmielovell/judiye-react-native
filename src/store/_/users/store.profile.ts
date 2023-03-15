import {Email, Phone} from 'domains';
import {EScope, IProfile, IProfileType} from './models';

export default class Profile {
  profile_id: string;
  username: string;
  phonetic_name: string | null;
  avatar_url: string | null;
  public_url: string | null;
  public_email: Email | null;
  public_phone: Phone | null;
  mission_statement: string | null;
  type: IProfileType;
  scope: EScope;
  date_created: Date;

  constructor(user: IProfile) {
    this.profile_id = user.profile_id;
    this.username = user.username;
    this.phonetic_name = user.phonetic_name;
    this.avatar_url = user.avatar_url;
    this.public_url = user.public_url;
    this.public_email = user.public_email;
    this.public_phone = user.public_phone;
    this.mission_statement = user.mission_statement;
    this.type = user.type;
    this.scope = user.scope;
    this.date_created = user.date_created;
  }
}
