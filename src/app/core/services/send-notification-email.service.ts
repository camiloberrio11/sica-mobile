import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { Injectable } from '@angular/core';
import { GeneratePdfService } from './generate-pdf.service';
import {
  Attachment,
  SendNotificationEmail,
} from '../models/SendEmailNotification';

@Injectable({
  providedIn: 'root',
})
export class SendNotificationEmailService {
  constructor(private readonly sicaBackendService: SicaBackendService) {}

  sendEmailNotification(
    emails: string,
    attachments: Attachment[],
    subject: string,
    bodyEmail: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const body: SendNotificationEmail = {
        email: 'appsmetis@gmail.com',
        subjectEmail: subject,
        mailsToSend: [...emails.split(',')],
        colorPrimary: '#4e909b',
        contentEmail: bodyEmail,
        imgHeaderEmail:
          'https://res.cloudinary.com/dupegtamn/image/upload/v1645447665/logo-metis_php0qh.png',
        attachments,
        urlCompany: 'https://www.metis.com.co',
        nameCompany: 'Metis Consultores',
      };
      this.sicaBackendService.sendNotificationEmail(body).subscribe(
        (data) => resolve(data?.ok),
        (err) => {
          reject(false);
        }
      );
    });
  }
}
