import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatAutocompleteModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatDialogModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { fakeBackendProvider } from 'src/app/interceptors/fakedbackendinterceptor';
import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado/ingreso-menu-realizado.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AjusteStockComponent } from 'src/app/ajuste-stock/ajuste-stock.component';
import { BuscadorInsumosComponent } from './buscador-insumos/buscador-insumos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IngresoMenuRealizadoComponent,
    AjusteStockComponent,
    BuscadorInsumosComponent
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
    MatToolbarModule, MatIconModule,MatListModule,MatDialogModule
  ],
  entryComponents: [BuscadorInsumosComponent],
  providers: [AuthGuard,AuthenticationService,

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
