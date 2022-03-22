import { StringTransformService } from './string-transform.service';
import { Injectable } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  constructor(
    private readonly stringTransformService: StringTransformService
  ) {}

  generatePdf(contentPdf: string): Promise<string> {
    return new Promise((resolve, reject) => {
      PDFGenerator.fromData(contentPdf, {
        documentSize: 'A3',
        type: 'base64',
        landscape: 'portrait',
      })
        .then((base) =>
          resolve(this.stringTransformService.removeLinesBlank(base))
        )
        .catch((err) => reject(JSON.stringify(err)));
    });
  }
}
