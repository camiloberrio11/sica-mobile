import { Injectable } from '@angular/core';
import { Construction } from '../models/Construction';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {
  private constructionSelected: Construction;

  constructor() { }

  selectConstruction(construction: Construction): void {
    this.constructionSelected = construction;
  }

  getConstructionSelected(): Construction {
    return this.constructionSelected;
  }
}
