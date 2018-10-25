import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  host = 'http://localhost:8080';
  private handleError: HandleError;
  
  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('DownloadService');
   }

   
   getReportes (): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(this.host + '/comprasTotales', 
    {
      //headers: {"accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
     params: {"type":"1", "anio": "2018"}, responseType: "arraybuffer"})
      .pipe(
        catchError(this.handleError('getReportes', null))
      );
  }
   
}
