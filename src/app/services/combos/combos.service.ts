import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandlerService, HandleError } from 'src/app/http-error-handler.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Combo } from 'src/app/services/combos/combo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  url = 'http://localhost:8080/comboMenue';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('CombosService');
  }

  getMenues (): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.url)
      .pipe(
        catchError(this.handleError('getMenues', []))
      );
  }
}
