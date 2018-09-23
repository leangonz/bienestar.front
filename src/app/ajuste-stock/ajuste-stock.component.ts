import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';




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
  selector: 'app-ajuste-stock',
  templateUrl: './ajuste-stock.component.html',
  styleUrls: ['./ajuste-stock.component.css']
})
export class AjusteStockComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  displayedColumns: string[] = ['select', 'insumo', 'cantidad', 'unidadMedida'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

}

private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
