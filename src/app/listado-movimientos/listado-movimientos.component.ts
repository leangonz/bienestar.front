import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo';
import { Movimiento } from '../model/movimiento';
import { MatTableDataSource } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { MovimientosService } from '../services/movimientos/movimientos.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-movimientos',
  templateUrl: './listado-movimientos.component.html',
  styleUrls: ['./listado-movimientos.component.css']
})
export class ListadoMovimientosComponent implements OnInit {

  insumosControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  insumos: Combo[];

  displayedColumns: string[] = ['fecha', 'insumo', 'motivo','cantidad', 'unidadDeMedida'];
  dataSource = new MatTableDataSource<Movimiento>();

  constructor(private comboService: CombosService, private movimientosService: MovimientosService) { }

  ngOnInit() {
    this.getInsumos();
    this.fillTable();
  }

  getInsumos(): void {
    this.comboService.getInsumos()
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
    this.buscarMovimientos(null);
  }

  buscarMovimientos(id): void {
    this.movimientosService.filtrarMovimientos(id).subscribe(movimientos => {
      console.log(movimientos);
      this.dataSource = new MatTableDataSource<Movimiento>(movimientos);
    });
  }

  filtrar(): void {
    var id = null
    if(this.insumosControl.value){
     id = this.insumosControl.value.id;
    }    
    this.buscarMovimientos(id);
  } 
}
