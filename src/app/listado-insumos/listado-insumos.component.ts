import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo';
import { InsumoMenu } from '../model/insumo';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { InsumoService } from '../services/insumos/insumo.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-insumos',
  templateUrl: './listado-insumos.component.html',
  styleUrls: ['./listado-insumos.component.css']
})
export class ListadoInsumosComponent implements OnInit {

  insumosControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  insumos: Combo[];

  displayedColumns: string[] = ['insumo', 'categoria', 'unidadMedida', 'modificar', 'eliminar'];
  dataSource = new MatTableDataSource<InsumoMenu>();

  constructor(private comboService: CombosService, private insumosService: InsumoService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getInsumos();
    this.fillTable();
  }

  getInsumos(): void {
    this.comboService.getInsumosActivos()
      .subscribe(insumos => {
        this.insumos = insumos
        this.filteredOptions = this.insumosControl.valueChanges
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

    return this.insumos.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  fillTable(): void {
    this.buscarInsumos(null);
  }

  buscarInsumos(id): void {
    this.insumosService.filtrarInsumos(id).subscribe(insumos => {
      console.log(insumos);
      this.dataSource = new MatTableDataSource<InsumoMenu>(insumos);
    });
  }

  filtrarInsumos(): void {
    var id = null
    if(this.insumosControl.value){
     id = this.insumosControl.value.id;
    }    
    this.buscarInsumos(id);
  } 

  delete(id): void {
    if(confirm("Are you sure to delete "+id)) {
      this.insumosService.borrarInsumo(id).subscribe(rta =>{
        console.log(rta);
        if(rta){
          this.filtrarInsumos();
          this.getInsumos();
          this.openSnackBar("Se elimino el insumo", "OK");
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
