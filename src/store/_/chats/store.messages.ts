import {IMessage} from './models';

export class Message {
  message_id: string;
  type: 'sent' | 'received';

  text: string | null;
  attachments: IAttachment[] | null;

  date_created: Date;
  date_queued: Date | null;
  date_sent: Date | null;
  date_delivered: Date | null;
  date_read: Date | null;

  date_updated: Date | null;
  date_deleted: Date | null;

  is_sent: boolean;
  is_queued: boolean;
  is_read: boolean;
  is_starred: boolean;
  is_flagged: boolean;
  is_spam: boolean;
  is_draft: boolean;

  is_received: boolean;
  is_unread: boolean;

  is_deleted: boolean;

  reference_message_id: string | null;

  constructor(message: IMessage) {
    this.message_id = message.message_id;
    this.type = message.type;
    this.message = message.message;
    this.date_created = message.date_created;
    this.date_updated = message.date_updated;
    this.date_deleted = message.date_deleted;
    this.date_read = message.date_read;
    this.date_received = message.date_received;
    this.date_sent = message.date_sent;
    this.is_deleted = message.is_deleted;
    this.is_read = message.is_read;
    this.is_starred = message.is_starred;
    this.is_flagged = message.is_flagged;
    this.is_spam = message.is_spam;
    this.is_trashed = message.is_trashed;
    this.is_draft = message.is_draft;
    this.is_sent = message.is_sent;
    this.is_received = message.is_received;
    this.is_unread = message.is_unread;

    this.reference_message_id = message.reference_message_id;
  }

  get reference_message(): Message | null {
    return null;
  }

  get is_sent(): boolean {
    if (this.date_sent) {
      return true;
    }
    return false;
  }
}
