import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Construction } from '../models/Construction';
import { environment } from 'src/environments/environment.prod';
import { ConstructionService } from './construction.service';
import { ToolByBarcodeResponseService } from '../models/Tool';
import { User } from '../models/User';

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

  getToolByCodeBar(code: string): Observable<ToolByBarcodeResponseService> {
    const idConstruction =
      this.constructionService.getConstructionSelected()?.id;
    return this.http.get<ToolByBarcodeResponseService>(
      `${environment.urlApi}/api/${idConstruction}/tool/${code}`
    );
  }

  getTokenByDocument(doc: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(
      `${environment.urlApi}/api/token/${doc}`
    );
  }

  getUserByToken(token: string): Observable<User> {
    return this.http.get<User>(
      `${environment.urlApi}/api/user/${token}`
    );
  }
}
