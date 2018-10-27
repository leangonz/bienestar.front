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

   
   getReportes (params): Observable<ArrayBuffer> {
     const options = {params: params, responseType: "arraybuffer" as "json"};
    return this.http.get<ArrayBuffer>(this.host + '/comprasTotales', options)
      .pipe(
        catchError(this.handleError('getReportes', null))
      );
  }
   
}
