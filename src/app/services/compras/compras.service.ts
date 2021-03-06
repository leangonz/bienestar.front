import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompraResumen } from '../../model/compraResumen';
import { Compra } from '../../model/compra';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
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
    return this.http.post<Boolean>(this.host + '/cargarCompra', data, httpOptions)
      .pipe(
        catchError(this.handleError('guardarCompra', false))
      );
  }

  filtrarCompras (idProveedor, factura): Observable<CompraResumen[]> {
    return this.http.post<CompraResumen[]>(this.host + '/filtrarCompra', {idProveedor, factura}, httpOptions)
      .pipe(
        catchError(this.handleError('filtrarCompra', []))
      );
  }

  buscarCompra (idCompra): Observable<Compra> {
    return this.http.post<Compra>(this.host + '/buscarCompra', {idCompra}, httpOptions)
      .pipe(
        catchError(this.handleError('buscarCompra', null))
      );
  }
}
