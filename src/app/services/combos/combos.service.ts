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
  }),
  withCredentials: true
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
    return this.http.get<Combo[]>(this.host + '/comboMenue', httpOptions)
      .pipe(
        catchError(this.handleError('getMenues', []))
      );
  }

  getMotivos (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboMotivosAjustables', httpOptions)
      .pipe(
        catchError(this.handleError('getMotivos', []))
      );
  }

  getComidasDia (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboComidasDia', httpOptions)
      .pipe(
        catchError(this.handleError('getComidasDia', []))
      );
  }

  getLocalidades (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboLocalidades', httpOptions)
      .pipe(
        catchError(this.handleError('getLocalidades', []))
      );
  }

  getFormasDePago (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboFormaDePago', httpOptions)
      .pipe(
        catchError(this.handleError('getFormasDePago', []))
      );
  }

  getProveedores (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboProveedores', httpOptions)
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getAreas (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboAreas', httpOptions)
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getCategorias (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboCategoriaCompra', httpOptions)
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getInsumos (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboInsumos', httpOptions)
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  getTiposMenu (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.host + '/comboTipoMenue', httpOptions)
      .pipe(
        catchError(this.handleError('getTiposMenu', []))
      );
  }
}
