import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from 'src/app/auth.guard';
import { IngresoMenuRealizadoComponent } from 'src/app/ingreso-menu-realizado/ingreso-menu-realizado.component';
import { AjusteStockComponent } from 'src/app/ajuste-stock/ajuste-stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'menuRealizado', component: IngresoMenuRealizadoComponent },
    { path: 'ajusteStock', component: AjusteStockComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
