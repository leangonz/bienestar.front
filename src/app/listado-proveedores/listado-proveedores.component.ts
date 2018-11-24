import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Combo } from '../model/combo';
import { Proveedor } from '../model/proveedor';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: ['./listado-proveedores.component.css']
})
export class ListadoProveedoresComponent implements OnInit {

  proveedorControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  proveedores: Combo[];

  displayedColumns: string[] = ['nombre', 'cuit', 'telefono', 'modificar', 'eliminar'];
  dataSource = new MatTableDataSource<Proveedor>();

  constructor(private comboService: CombosService, private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.getProveedores();
    this.fillTable();
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

  fillTable(): void {
    this.buscarProveedores(null);
  }

  buscarProveedores(id): void {
    this.proveedoresService.filtrarProveedor(id).subscribe(proveedores => {
      console.log(proveedores);
      this.dataSource = new MatTableDataSource<Proveedor>(proveedores);
    });
  }

  filtrarProveedores(): void {
    if(this.proveedorControl.value){
     this.buscarProveedores(this.proveedorControl.value.id);
    }
  }  
}
