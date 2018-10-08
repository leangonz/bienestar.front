import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Combo } from '../../model/combo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('CombosService');
  }

  getMenues (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboMenue')
      .pipe(
        catchError(this.handleError('getMenues', []))
      );
  }

  getMotivos (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboMotivosAjustables')
      .pipe(
        catchError(this.handleError('getMotivos', []))
      );
  }

  getLocalidades (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboLocalidades')
      .pipe(
        catchError(this.handleError('getLocalidades', []))
      );
  }

  getFormasDePago (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboFormaDePago')
      .pipe(
        catchError(this.handleError('getFormasDePago', []))
      );
  }

  getProveedores (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboProveedores')
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getAreas (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboAreas')
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getCategorias (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboCategoriaCompra')
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getInsumos (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboInsumos')
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }
}
