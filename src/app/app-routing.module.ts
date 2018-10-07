import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado/ingreso-menu-realizado.component';
import { AjusteStockComponent } from './ajuste-stock/ajuste-stock.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'menuRealizado', component: IngresoMenuRealizadoComponent },
  { path: 'ajusteStock', component: AjusteStockComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'stock', component: StockComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
