import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Proveedor } from '../../model/proveedor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('ProveedoresService');
   }

   guardarProveedor (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/crearProveedor', data, httpOptions)
      .pipe(
        catchError(this.handleError('guardarProveedor', false))
      );
  }

  filtrarProveedor (idProveedor): Observable<Proveedor[]> {
    return this.http.post<Proveedor[]>(this.host + '/filtrarProveedor', {idProveedor}, httpOptions)
      .pipe(
        catchError(this.handleError('filtrarProveedor', []))
      );
  }
}
