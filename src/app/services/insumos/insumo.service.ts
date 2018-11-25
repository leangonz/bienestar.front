import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders } from '@angular/common/http';
import { InsumoMenu } from '../../model/insumo';
import { InsumoNuevo } from '../../model/InsumoNuevo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('MenuRealizadoService');
  }

  getInsumosMenu (idMenu): Observable<InsumoMenu[]> {
    return this.http.post<InsumoMenu[]>(this.host + '/cargaInsumoMenu', idMenu, httpOptions)
      .pipe(
        catchError(this.handleError('getInsumosMenu', []))
      );
  }

  getInsumos (): Observable<InsumoMenu[]> {
    return this.http.get<InsumoMenu[]>(this.host + '/cargaInsumo', httpOptions)
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  guardarMenuRealizado (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/guardarConsumoRealizado', data, httpOptions)
      .pipe(
        catchError(this.handleError('guardarMenuRealizado', false))
      );
  }

  guardarInsumo (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/crearInsumo', data, httpOptions)
      .pipe(
        catchError(this.handleError('guardarInsumo', false))
      );
  }

  modificarInsumo (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/modificarInsumo', data, httpOptions)
      .pipe(
        catchError(this.handleError('modificarInsumo', false))
      );
  }

  filtrarInsumos (idInsumo): Observable<InsumoMenu[]> {
    return this.http.post<InsumoMenu[]>(this.host + '/filtrarInsumo', {idInsumo}, httpOptions)
      .pipe(
        catchError(this.handleError('filtrarInsumo', []))
      );
  }

  borrarInsumo (idInsumo): Observable<Boolean[]> {
    return this.http.post<Boolean[]>(this.host + '/borrarInsumo', {idInsumo}, httpOptions)
      .pipe(
        catchError(this.handleError('borrarInsumo', []))
      );
  }

  buscarInsumo (idInsumo): Observable<InsumoNuevo> {
    return this.http.post<InsumoNuevo>(this.host + '/buscarInsumo', {idInsumo}, httpOptions)
      .pipe(
        catchError(this.handleError('buscarInsumo', null))
      );
  }
}
