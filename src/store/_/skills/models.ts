export interface ISkill {
  id: string;
  name: string;
  description: string | null;
  public_url: string | null;
  public_avatar_url: string | null;
  date_created: Date;
}
