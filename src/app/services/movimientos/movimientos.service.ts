import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movimiento } from '../../model/movimiento';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('MovimientosService');
   }

  filtrarMovimientos (idInsumo): Observable<Movimiento[]> {
    return this.http.post<Movimiento[]>(this.host + '/filtrarMovimientos', {idInsumo}, httpOptions)
      .pipe(
        catchError(this.handleError('filtrarMovimientos', []))
      );
  }
}
