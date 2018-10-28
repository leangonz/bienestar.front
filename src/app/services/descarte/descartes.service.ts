import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descarte } from '../../model/descarte';
import { catchError } from 'rxjs/operators';
import { MenuCantidad } from '../../model/menuCantidad';

@Injectable({
  providedIn: 'root'
})
export class DescartesService {

  host = 'http://localhost:8080';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('DescartesService');
  }

  getMenuesDescarte (): Observable<MenuCantidad[]> {
    return this.http.get<MenuCantidad[]>(this.host + '/obtenerMenues')
      .pipe(
        catchError(this.handleError('getMenuesDescarte', []))
      );
  }

  guardarDescarte (data): Observable<Boolean> {
    return this.http.post<Boolean>(this.host + '/registrarHistorialDescarte', data)
      .pipe(
        catchError(this.handleError('guardarDescarte', false))
      );
  }
}
