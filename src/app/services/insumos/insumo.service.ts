import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from 'src/app/http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { InsumoMenu } from 'src/app/services/insumos/insumo';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  url = 'http://localhost:8080/cargaInsumoMenu';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('MenuRealizadoService');
  }

  getInsumosMenu (idMenu): Observable<InsumoMenu[]> {
    return this.http.post<InsumoMenu[]>(this.url, idMenu)
      .pipe(
        catchError(this.handleError('getInsumosMenu', []))
      );
  }
}
