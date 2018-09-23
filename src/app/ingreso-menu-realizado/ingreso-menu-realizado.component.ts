import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Combo } from 'src/app/services/combos/combo';
import { CombosService } from 'src/app/services/combos/combos.service';
import { InsumoService } from 'src/app/services/insumos/insumo.service';
import { InsumoMenu } from 'src/app/services/insumos/insumo';

export interface PeriodicElement {
  insumo: string;
  cantidad: number;
  unidadMedida: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {insumo: 'Hydrogen', cantidad: 1,  unidadMedida: 'H'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'He'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'Li'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'Be'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'B'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'C'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'N'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'O'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'F'},
  {insumo: 'Hydrogen', cantidad: 1, unidadMedida: 'Ne'},
];

@Component({
  selector: 'app-ingreso-menu-realizado',
  templateUrl: './ingreso-menu-realizado.component.html',
  styleUrls: ['./ingreso-menu-realizado.component.css']
})
export class IngresoMenuRealizadoComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  menues: Combo[];

  displayedColumns: string[] = ['select', 'insumo', 'cantidad', 'unidadMedida'];
  dataSource = new MatTableDataSource<InsumoMenu>();
  selection = new SelectionModel<InsumoMenu>(true, []);

  constructor(private comboService: CombosService, private insumoService: InsumoService) { }

  ngOnInit() {
    this.getMenues();
  }

  getMenues(): void {
    this.comboService.getMenues()
      .subscribe(menues => {
        this.menues = menues
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
      });
  }

  displayMenues(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  getInsumosMenu(idMenu): void {
    this.insumoService.getInsumosMenu(idMenu)
      .subscribe(insumos => {
        this.dataSource = new MatTableDataSource<InsumoMenu>(insumos);
      });
  }

  private _filter(descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return this.menues.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
