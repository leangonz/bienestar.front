import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from 'src/app/http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders } from '@angular/common/http';
import { InsumoMenu } from 'src/app/model/insumo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
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
    return this.http.post<InsumoMenu[]>(this.host + '/cargaInsumoMenu', idMenu)
      .pipe(
        catchError(this.handleError('getInsumosMenu', []))
      );
  }

  getInsumos (): Observable<InsumoMenu[]> {
    return this.http.get<InsumoMenu[]>(this.host + '/cargaInsumo')
      .pipe(
        catchError(this.handleError('getInsumos', []))
      );
  }

  guardarMenuRealizado (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/guardarInsumoRealizado', data)
      .pipe(
        catchError(this.handleError('guardarMenuRealizado', false))
      );
  }
}
