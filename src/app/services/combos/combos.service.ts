import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandlerService, HandleError } from 'src/app/http-error-handler.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Combo } from 'src/app/model/combo';


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
}
