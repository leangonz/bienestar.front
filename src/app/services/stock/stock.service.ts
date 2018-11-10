import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { Stock} from '../../model/stock';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('StockService');
  }

  ajustarStock (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/ajustarStock', data, httpOptions)
      .pipe(
        catchError(this.handleError('ajustarStock', false))
      );
  }

  consultarStock (idInsumo): Observable<Stock> {
    return this.http.post<Stock>(this.host + '/consultarStock', idInsumo, httpOptions)
      .pipe(
        catchError(this.handleError('consultarStock', null))
      );
  }
}
