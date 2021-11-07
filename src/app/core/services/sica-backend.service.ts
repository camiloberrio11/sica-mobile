import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Construction } from '../models/Construction';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SicaBackendService {

  constructor(private http: HttpClient) { }

  getConstruiction(): Observable<Construction[]> {
    return this.http.get<Construction[]>(
      `${environment.urlApi}/api/construction`
    );
  }
}
