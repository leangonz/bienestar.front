import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatAutocompleteModule, MatTableModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { fakeBackendProvider } from 'src/app/interceptors/fakedbackendinterceptor';
import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado/ingreso-menu-realizado.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IngresoMenuRealizadoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatDatepickerModule,
    MatNativeDateModule, MatFormFieldModule,MatInputModule,
    MatAutocompleteModule, MatTableModule
  ],
  providers: [AuthGuard,AuthenticationService,

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
