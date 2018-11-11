import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado/ingreso-menu-realizado.component';
import { AjusteStockComponent } from './ajuste-stock/ajuste-stock.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { StockComponent } from './stock/stock.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { ListadoComprasComponent } from './listado-compras/listado-compras.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DescarteComponent } from './descarte/descarte.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'menuRealizado', component: IngresoMenuRealizadoComponent, canActivate: [AuthGuard] },
  { path: 'ajusteStock', component: AjusteStockComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'compra', component: OrdenCompraComponent, canActivate: [AuthGuard] },
  { path: 'listaCompras', component: ListadoComprasComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
  { path: 'descarte', component: DescarteComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
