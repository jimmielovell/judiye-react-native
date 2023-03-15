import {IChat} from './models';

export default class Chats {
  private _chats: Chat[] = [];
}

export class Chat {
  chat_id: string;
  message: string;
  date_created: Date;
  date_updated: Date;
  date_deleted: Date | null;
  is_deleted: boolean;
  is_read: boolean;
  is_starred: boolean;
  is_pinned: boolean;
  is_archived: boolean;
  is_muted: boolean;
  is_snoozed: boolean;
  is_flagged: boolean;
  is_blocked: boolean;
  is_spam: boolean;
  is_trashed: boolean;
  is_draft: boolean;
  is_sent: boolean;
  is_received: boolean;
  is_unread: boolean;

  constructor(chat: IChat) {
    this.chat_id = chat.chat_id;
    this.message = chat.message;
    this.date_created = chat.date_created;
    this.date_updated = chat.date_updated;
    this.date_deleted = chat.date_deleted;
    this.is_deleted = chat.is_deleted;
    this.is_read = chat.is_read;
    this.is_starred = chat.is_starred;
    this.is_pinned = chat.is_pinned;
    this.is_archived = chat.is_archived;
    this.is_muted = chat.is_muted;
    this.is_snoozed = chat.is_snoozed;
    this.is_flagged = chat.is_flagged;
    this.is_blocked = chat.is_blocked;
    this.is_spam = chat.is_spam;
    this.is_trashed = chat.is_trashed;
    this.is_draft = chat.is_draft;
    this.is_sent = chat.is_sent;
    this.is_received = chat.is_received;
    this.is_unread = chat.is_unread;
  }
}
