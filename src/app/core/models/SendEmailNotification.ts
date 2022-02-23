export interface SendNotificationEmail {
  email: string;
  subjectEmail: string;
  mailsToSend: string[];
  colorPrimary: string;
  contentEmail: string;
  imgHeaderEmail: string;
  attachments: Attachment[];
  urlCompany: string;
  nameCompany: string;
}

export interface ResponseSendNotificationEmail {
  ok: boolean;
  message: string;
  data: any;
}

interface Attachment {
  name: string;
  data: string;
}
