import {IProfile} from '../users/models';

export interface IMetadata {
  width: number | null;
  height: number | null;
  duration: number | null;
  size: number | null;
  mime_type: string | null;
}

export interface IAttachment {
  caption: string | null;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
  url: string | string[];
  metadata: IMetadata;
}

export interface IMessage {
  message_id: string;
  chat_id: string;
  sender_participant_id: string;

  text: string | null;
  attachments: IAttachment[] | null;

  date_created: Date;
  date_queued: Date | null;
  date_sent: Date | null;
  date_delivered: Date | null;
  date_read: Date | null;

  date_updated: Date | null;
  date_deleted: Date | null;

  is_queued: boolean;
  is_sent: boolean;
  is_delivered: boolean;
  is_read: boolean;

  is_starred: boolean;
  is_flagged: boolean;
  is_spam: boolean;
  is_draft: boolean;

  is_deleted: boolean;

  reference_message_id: string | null;
}

export interface IChatParticipant extends IProfile {
  participant_id: string;
  chat_id: string;
  date_joined: Date;
  date_left: Date | null;
  is_left: boolean;
  is_owner: boolean;
  is_invited: boolean;
  is_blocked: boolean;
  is_initiator: boolean;
}

/*
 * This is the model for a chat. A chat is a conversation between two or more people.
 * A chat can be a group chat or a one-on-one chat.
 * A chat can be a direct message or a group message.
 * A chat can be a private chat or a public chat.
 * A chat can be a personal chat or an organizational chat.
 */
export interface IChat {
  chat_id: string;
  date_created: Date;
  date_updated: Date;
  date_deleted: Date | null;

  is_deleted: boolean;

  is_starred: boolean;
  is_pinned: boolean;
  is_archived: boolean;
  is_muted: boolean;
  is_snoozed: boolean;
  is_flagged: boolean;
  is_blocked: boolean;
  is_spam: boolean;
}
