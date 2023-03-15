import {ISkill} from './models';

export default class Skills {
  private _skills: Skill[] = [];

  constructor() {}
}

export class Skill {
  id: string;
  name: string;
  description: string | null;
  public_url: string | null;
  public_avatar_url: string | null;
  date_created: Date;

  constructor(skill: ISkill) {
    this.id = skill.id;
    this.name = skill.name;
    this.description = skill.description;
    this.public_url = skill.public_url;
    this.public_avatar_url = skill.public_avatar_url;
    this.date_created = skill.date_created;
  }
}
