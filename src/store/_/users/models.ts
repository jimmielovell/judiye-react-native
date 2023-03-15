import {Email, Phone} from 'domains';

export type IProfileType = 'person' | 'organization';

export enum EScope {
  'Private' = 'private',
  'Public' = 'public',
  'Organization' = 'organization',
  'Event' = 'event',
}

export interface IRole {
  role_id: string;
  name: string;
  description: string | null;
  organization_id: string | null;
  date_started: Date;
  date_ended: Date | null;
  scope: EScope;
}

export interface IAccount {
  account_id: string; // This is a bigint in the database
  fullname: string;
}

export interface IProfile {
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
}

export interface IOwner extends IAccount, IProfile {
  is_owner: true;
  email: Email | null;
  phone: Phone | null;
}

export interface IPerson extends IProfile {
  roles: IRole[];
}

export interface IOrganization extends IProfile {
  specialties: string[];
}

export interface IColleague extends IProfile {
  date_created: Date;
}
