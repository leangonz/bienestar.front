import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CombosService } from 'src/app/services/combos/combos.service';
import { InsumoService } from 'src/app/services/insumos/insumo.service';
import { Combo } from 'src/app/model/combo';
import { InsumoMenu } from 'src/app/model/insumo';
import { BuscadorInsumosComponent } from 'src/app/buscador-insumos/buscador-insumos.component';
import { MenuRealizado } from 'src/app/model/menuRealizado';

@Component({
  selector: 'app-ingreso-menu-realizado',
  templateUrl: './ingreso-menu-realizado.component.html',
  styleUrls: ['./ingreso-menu-realizado.component.css']
})
export class IngresoMenuRealizadoComponent implements OnInit {

  comensalesGroup = new FormGroup({
    fecha: new FormControl('', Validators.required),
    lactarios: new FormControl('', Validators.required),
    unAnio: new FormControl('', Validators.required),
    dosAnios: new FormControl('', Validators.required),
    tresAnios: new FormControl('', Validators.required),
    cuatroCincoAnios: new FormControl('', Validators.required),
    adultos: new FormControl('', Validators.required),
  });

  myControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  menues: Combo[];

  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida', 'delete'];
  dataSource = new MatTableDataSource<InsumoMenu>();

  constructor(private comboService: CombosService, private insumoService: InsumoService,
    public dialog: MatDialog) { }

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

  private _filter(descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return this.menues.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }
  
  getInsumosMenu(idMenu): void {
    console.log(idMenu);
    this.insumoService.getInsumosMenu(idMenu)
      .subscribe(insumos => {
        this.dataSource = new MatTableDataSource<InsumoMenu>(insumos);
      });
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
      this.dataSource.data.push(result);
      this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
    });
  }
  
  guardar(): void {
    var dtoToSend = {} as MenuRealizado ;
    dtoToSend.fecha = this.comensalesGroup.get("fecha").value;
    dtoToSend.lactarios = this.comensalesGroup.get("lactarios").value;
    dtoToSend.unAnio = this.comensalesGroup.get("unAnio").value;
    dtoToSend.dosAnios = this.comensalesGroup.get("dosAnios").value;
    dtoToSend.tresAnios = this.comensalesGroup.get("tresAnios").value;
    dtoToSend.cuatroCincoAnios = this.comensalesGroup.get("cuatroCincoAnios").value;
    dtoToSend.adultos = this.comensalesGroup.get("adultos").value;
    dtoToSend.insumos = this.dataSource.data;
    console.log(dtoToSend);

    this.insumoService.guardarMenuRealizado(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
      });
  }
}
