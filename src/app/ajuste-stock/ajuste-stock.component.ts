import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { InsumoMenu } from '../model/insumo';
import { CombosService } from '../services/combos/combos.service';
import { InsumoService } from '../services/insumos/insumo.service';
import { Combo } from '../model/combo';
import { BuscadorInsumosComponent } from '../buscador-insumos/buscador-insumos.component';
import {StockAjustado} from '../model/StockAjustado';
import { StockService } from '../services/stock/stock.service';

@Component({
  selector: 'app-ajuste-stock',
  templateUrl: './ajuste-stock.component.html',
  styleUrls: ['./ajuste-stock.component.css']
})
export class AjusteStockComponent implements OnInit {

  ajusteGroup = new FormGroup({
    fecha: new FormControl('', Validators.required),
    motivos: new FormControl()
  });

  filteredOptions: Observable<Combo[]>;
  motivos: Combo[];

  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida', 'delete'];
  dataSource = new MatTableDataSource<InsumoMenu>();

  constructor(private comboService: CombosService, private insumoService: InsumoService,
    private stockService: StockService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getMotivos();
  }

  getMotivos(): void {
    this.comboService.getMotivos()
      .subscribe(motivos => {
        this.motivos = motivos
        this.filteredOptions = this.ajusteGroup.get("motivos").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
      });
  }

  displayMotivos(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return this.motivos.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  borrarInsumo(idInsumo): void {
    let index: number = this.dataSource.data.findIndex(d => d.id === idInsumo);
    this.dataSource.data.splice(index,1);
    this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BuscadorInsumosComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //agrego insumo a la tabla
      if(result && this.dataSource.data.findIndex(d => d.id === result.id)) {
        console.log("agrego item a la tabla");
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
      }
    });
  }

  guardar(): void {
    var dtoToSend = {} as StockAjustado;
    dtoToSend.fecha = this.ajusteGroup.get("fecha").value;
    dtoToSend.motivo = this.ajusteGroup.get("motivos").value.id;
    dtoToSend.insumos = this.dataSource.data;
    console.log(dtoToSend);

    this.stockService.ajustarStock(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
      });
  }
}
