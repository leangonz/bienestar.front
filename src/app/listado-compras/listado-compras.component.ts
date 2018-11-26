import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { ComprasService } from '../services/compras/compras.service';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { CompraResumen } from '../model/compraResumen';

@Component({
  selector: 'app-listado-compras',
  templateUrl: './listado-compras.component.html',
  styleUrls: ['./listado-compras.component.css']
})
export class ListadoComprasComponent implements OnInit {

  facturaControl = new FormControl();
  proveedorControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  proveedores: Combo[];

  displayedColumns: string[] = ['factura', 'fecha', 'proveedor', 'precioTotal', 'detalle'];
  dataSource = new MatTableDataSource<CompraResumen>();
  
  constructor(private comboService: CombosService, private comprasService: ComprasService) { }

  ngOnInit() {
    this.getProveedores();
    this.fillTable();
  }

  fillTable(): void {
    this.buscarCompra(null, null);
  }

  getProveedores(): void {
    this.comboService.getProveedores()
      .subscribe(proveedores => {
        this.proveedores = proveedores
        this.filteredOptions = this.proveedorControl.valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
    });
  }

  displayCombo(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return this.proveedores.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  filtrarCompra(): void {
    var proveedor;
    var factura;
    if(this.proveedorControl.value){
     proveedor = this.proveedorControl.value.id;
    }
    if(this.facturaControl.value){
     factura = this.facturaControl.value;
    }
    this.buscarCompra(proveedor, factura);
  }

  buscarCompra(proveedor, factura) :void{
    this.comprasService.filtrarCompras(proveedor, factura).subscribe(compras => {
      console.log(compras);
      this.dataSource = new MatTableDataSource<CompraResumen>(compras);
    });
  }
}
