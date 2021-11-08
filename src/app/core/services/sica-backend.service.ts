import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Construction } from '../models/Construction';
import { environment } from 'src/environments/environment.prod';
import { ConstructionService } from './construction.service';
import { ToolResponseService } from '../models/Tool';

@Injectable({
  providedIn: 'root',
})
export class SicaBackendService {
  constructor(
    private http: HttpClient,
    private constructionService: ConstructionService
  ) {}

  getConstruiction(): Observable<Construction[]> {
    return this.http.get<Construction[]>(
      `${environment.urlApi}/api/construction`
    );
  }

  getToolByCodeBar(code: string): Observable<ToolResponseService> {
    const idConstruction = this.constructionService.getConstructionSelected()?.id;
    return this.http.get<ToolResponseService>(
      `${environment.urlApi}/api/${idConstruction}/tool/${code}`
    );
  }
}
