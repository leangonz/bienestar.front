import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompraResumen } from '../../model/compraResumen';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('ProveedoresService');
  }

  guardarCompra (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/cargarCompra', data)
      .pipe(
        catchError(this.handleError('guardarCompra', false))
      );
  }

  filtrarCompras (idProveedor): Observable<CompraResumen[]> {
    return this.http.post<CompraResumen[]>(this.host + '/filtrarCompra', idProveedor)
      .pipe(
        catchError(this.handleError('filtrarCompra', []))
      );
  }
}
