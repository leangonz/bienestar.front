import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Combo } from '../model/combo';
import { Proveedor } from '../model/proveedor';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private comboService: CombosService, private proveedoresService: ProveedoresService,
    public dialog: MatDialog, public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProveedores();
    this.fillTable();
  }

  getProveedores(): void {
    this.comboService.getProveedoresActivos()
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
    var id = null
    if(this.proveedorControl.value){
     id = this.proveedorControl.value.id;
    }    
    this.buscarProveedores(id);
  } 
  
  delete(id): void {
    if(confirm("Are you sure to delete "+id)) {
      this.proveedoresService.borrarProveedor(id).subscribe(rta =>{
        console.log(rta);
        if(rta){
          this.filtrarProveedores();
          this.getProveedores();
          this.openSnackBar("Se elimino el proveedor", "OK");
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
