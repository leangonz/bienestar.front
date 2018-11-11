import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  host = 'http://localhost:8080';
  private handleError: HandleError;
  
  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('MenuService');
  }
  
  guardarMenu (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/crearMenu', data, httpOptions)
      .pipe(
        catchError(this.handleError('guardarMenu', false))
      );
  }
}
