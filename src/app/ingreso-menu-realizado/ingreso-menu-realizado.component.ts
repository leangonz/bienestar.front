import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CombosService } from '../services/combos/combos.service';
import { InsumoService } from '../services/insumos/insumo.service';
import { Combo } from '../model/combo';
import { InsumoMenu } from '../model/insumo';
import { BuscadorInsumosComponent } from '../buscador-insumos/buscador-insumos.component';
import { MenuRealizado } from '../model/menuRealizado';
import * as moment from 'moment';

@Component({
  selector: 'app-ingreso-menu-realizado',
  templateUrl: './ingreso-menu-realizado.component.html',
  styleUrls: ['./ingreso-menu-realizado.component.css']
})
export class IngresoMenuRealizadoComponent implements OnInit {

  comensalesGroup = new FormGroup({
    fecha: new FormControl(moment(), Validators.required),
    lactarios: new FormControl('', Validators.required),
    unAnio: new FormControl('', Validators.required),
    dosAnios: new FormControl('', Validators.required),
    tresAnios: new FormControl('', Validators.required),
    cuatroCincoAnios: new FormControl('', Validators.required),
    adultos: new FormControl('', Validators.required),
    myControl: new FormControl(),
    comidaDiaControl: new FormControl('', Validators.required)
  });

  filteredOptions: Observable<Combo[]>;
  menues: Combo[];

  comidaDiaOptions: Observable<Combo[]>;
  comidasDia: Combo[];

  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida', 'delete'];
  dataSource = new MatTableDataSource<InsumoMenu>();

  constructor(private comboService: CombosService, private insumoService: InsumoService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getMenues();
    this.getComidasDia();
  }

  getComidasDia(): void {
    this.comboService.getComidasDia()
      .subscribe(comidasDia => {
        this.comidasDia = comidasDia
        this.comidaDiaOptions = this.comensalesGroup.get("comidaDiaControl").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.comidasDia, descripcion))
      );
      });
  }

  getMenues(): void {
    this.comboService.getMenues()
      .subscribe(menues => {
        this.menues = menues
        this.filteredOptions = this.comensalesGroup.get("myControl").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.menues, descripcion))
      );
      });
  }

  displayMenues(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(lista: Combo[], descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return lista.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }
  
  getInsumosMenu(idMenu): void {
    console.log(idMenu);
    this.insumoService.getInsumosMenu(idMenu)
      .subscribe(insumos => {
        insumos = insumos.filter(item => this.dataSource.data.findIndex(d => d.id === item.id) == -1);
        this.dataSource.data = this.dataSource.data.concat(insumos);
        
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
      console.log("id de insumo " + result.id);
      var isNotDuplicated = this.dataSource.data.findIndex(d => d.id === result.id) == -1;
      console.log("valor de variable " + isNotDuplicated);
      if(result && isNotDuplicated){
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
      }
    });
  }
  agregarInsumosByMenu(): void {
    var menueSelected = this.comensalesGroup.get("myControl").value;
    if(menueSelected){
      this.getInsumosMenu(menueSelected.id);
    }
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
    dtoToSend.momentoDelDia = this.comensalesGroup.get("comidaDiaControl").value.id
    dtoToSend.insumos = this.dataSource.data;

    if(this.dataSource.data.length > 0){
      console.log(dtoToSend);
  
      this.insumoService.guardarMenuRealizado(dtoToSend)
        .subscribe(resultado => {
          console.log(resultado);
          if(resultado){
            this.reiniciarForm();
            this.openSnackBar("Se registró la comida realizada", "OK");
          }
        });
    } else {
      this.openSnackBar("Debe cargar al menos un insumo", "OK");
    }
  }

  private reiniciarForm(){
    this.comensalesGroup.reset('',{emitEvent: false});
    Object.keys(this.comensalesGroup.controls).forEach((name) => {
      this.comensalesGroup.get(name).reset('');
      this.comensalesGroup.get(name).setErrors(null);
      this.comensalesGroup.get(name).markAsPending();
    });
    this.dataSource = new MatTableDataSource<InsumoMenu>();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
