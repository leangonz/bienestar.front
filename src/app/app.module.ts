import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule,
   MatInputModule, MatAutocompleteModule, MatTableModule,
    MatSidenavModule, MatToolbarModule, MatIconModule,
     MatListModule, MatDialogModule, MatSnackBarModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DATE_LOCALE_FACTORY, MAT_NATIVE_DATE_FORMATS} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { fakeBackendProvider } from './interceptors/fakedbackendinterceptor';
import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado/ingreso-menu-realizado.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AjusteStockComponent } from './ajuste-stock/ajuste-stock.component';
import { BuscadorInsumosComponent } from './buscador-insumos/buscador-insumos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { StockComponent } from './stock/stock.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';

import * as _moment from 'moment';
import { ListadoComprasComponent } from './listado-compras/listado-compras.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DescarteComponent } from './descarte/descarte.component';
import { BuscadorMenusComponent } from './buscador-menus/buscador-menus.component';


import { NgxPermissionsModule } from 'ngx-permissions';
import { MenuComponent } from './menu/menu.component';
import { InsumoComponent } from './insumo/insumo.component';
import { ListadoProveedoresComponent } from './listado-proveedores/listado-proveedores.component';
import { ListadoMenusComponent } from './listado-menus/listado-menus.component';
import { ListadoInsumosComponent } from './listado-insumos/listado-insumos.component';

export const DD_MM_YYYY_Format = {
  parse: {
      dateInput: 'LL',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IngresoMenuRealizadoComponent,
    AjusteStockComponent,
    BuscadorInsumosComponent,
    ProveedoresComponent,
    StockComponent,
    OrdenCompraComponent,
    ListadoComprasComponent,
    ReportesComponent,
    DescarteComponent,
    BuscadorMenusComponent,
    MenuComponent,
    InsumoComponent,
    ListadoProveedoresComponent,
    ListadoMenusComponent,
    ListadoInsumosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule,MatDatepickerModule,
    MatNativeDateModule, MatFormFieldModule,MatInputModule,
    MatAutocompleteModule, MatTableModule,MatSidenavModule,
    MatToolbarModule, MatIconModule,MatListModule,MatDialogModule,
    MatSnackBarModule, NgxPermissionsModule.forRoot()
  ],
  entryComponents: [BuscadorInsumosComponent, BuscadorMenusComponent],
  providers: [AuthGuard,AuthenticationService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
