import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringTransformService {
  constructor() {}

  removeAccents(textToTransform: string): string {
    return textToTransform.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  removeSpecialCharacters(textToTransform: string): string {
    return textToTransform.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  }

  removeAdditionalSpaces(textToTransform: string): string {
    return textToTransform.replace(/\s+/g, '').trim();
  }

  formatCurrency(value: number): string {
    const valueFormat = `${value}`;
    const valueTotal = `${valueFormat.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1.'
    )}`?.trim();
    return valueTotal;
  }

  removeLinesBlank(text: string): string {
    return text?.replace(/(\r\n|\n|\r)/gm, '');
  }
  formatDate(dateString): string {
    const cleanString = dateString.replace(/\D/g, '');
    let output = cleanString.substr(0, 8);
    const size = dateString.length;
    if (size > 4) {
      output = this.insertString(output, '/', 4);
    }
    if (size > 2) {
      output = this.insertString(output, '/', 2);
    }
    return output;
  }

  getExtensionFile(nameFile: string = ''): string {
    return nameFile?.split('.').pop();
  }

  private insertString(originalString, newString, index) {
    return (
      originalString.substr(0, index) + newString + originalString.substr(index)
    );
  }
}
