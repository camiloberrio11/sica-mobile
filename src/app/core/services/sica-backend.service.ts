import { Movement, ReceiveToolBody } from './../models/Movement';
import { CategoryTool } from './../models/CategoryTool';
import { Brand } from './../models/Brand';
import { Supplier } from './../models/Supplier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Construction } from '../models/Construction';
import { environment } from 'src/environments/environment.prod';
import { ConstructionService } from './construction.service';
import { CreateToolBody, ToolByBarcodeResponseService } from '../models/Tool';
import { User } from '../models/User';
import { CreateLoanBody, UpdateLoanBody } from '../models/Loan';
import { SaveRentedToolBody } from '../models/RentedTool';
import { SendEToolBody } from '../models/Movement';
import { Reason } from '../models/Reason';

@Injectable({
  providedIn: 'root',
})
export class SicaBackendService {
  constructor(
    private http: HttpClient,
    private constructionService: ConstructionService
  ) {}

  login(bodyLogin: {
    username: string;
    password: string;
  }): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(
      `${environment.urlApi}/api/login`,
      bodyLogin
    );
  }

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
    return this.http.get<User>(`${environment.urlApi}/api/user/${token}`);
  }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.urlApi}/api/supplier`);
  }

  getBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.urlApi}/api/brand`);
  }

  getReason(): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${environment.urlApi}/api/reason`);
  }

  getLastMovement(toolId: string): Observable<Movement> {
    const idConstruction =
    this.constructionService.getConstructionSelected()?.id;
    return this.http.get<Movement>(`${environment.urlApi}/api/${idConstruction}/tool/movement/last-of/${toolId}`);
  }

  getCategoryTool(): Observable<CategoryTool[]> {
    return this.http.get<CategoryTool[]>(`${environment.urlApi}/api/category`);
  }

  getCategoryToolByBarcode(barcode: string): Observable<CategoryTool> {
    return this.http.get<CategoryTool>(
      `${environment.urlApi}/api/category/${barcode}`
    );
  }

  createLoan(body: CreateLoanBody): Observable<{ id: string }> {
    const idConstruction =
      this.constructionService.getConstructionSelected()?.id;
    return this.http.post<{ id: string }>(
      `${environment.urlApi}/api/${idConstruction}/tool/loan`,
      body
    );
  }

  createTool(body: CreateToolBody): Observable<{ id: string }> {
    const idConstruction =
      this.constructionService.getConstructionSelected()?.id;
    return this.http.post<{ id: string }>(
      `${environment.urlApi}/api/${idConstruction}/tool`,
      body
    );
  }

  updateLoan(
    body: UpdateLoanBody,
    loanId: string
  ): Observable<{ updated: boolean }> {
    const idConstruction =
      this.constructionService.getConstructionSelected()?.id;
    return this.http.patch<{ updated: boolean }>(
      `${environment.urlApi}/api/${idConstruction}/tool/loan/${loanId}/return-tool`,
      body
    );
  }

  createRentedTool(body: SaveRentedToolBody): Observable<{ id: string }> {
    const idConstruction =
      this.constructionService.getConstructionSelected()?.id;
    return this.http.post<{ id: string }>(
      `${environment.urlApi}/api/${idConstruction}/tool/rented`,
      body
    );
  }

  sendTool(body: SendEToolBody): Observable<any>{
    const idConstruction =
    this.constructionService.getConstructionSelected()?.id;
    return this.http.post<any>(`${environment?.urlApi}/api/${idConstruction}/tool/movement/send-tool`, body);
  }

  receiveTool(body: ReceiveToolBody, movementId: string): Observable<any>{
    const idConstruction =
    this.constructionService.getConstructionSelected()?.id;
    return this.http.patch<any>(`${environment?.urlApi}/api/${idConstruction}/tool/movement/${movementId}/receive-tool`, body);
  }
}
