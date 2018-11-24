import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Combo } from '../model/combo';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { InsumoMenu } from '../model/insumo';
import { CombosService } from '../services/combos/combos.service';
import { InsumoService } from '../services/insumos/insumo.service';
import { MenuService } from '../services/menu/menu.service';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { Menu } from '../model/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipoMenuControl: new FormControl('', Validators.required),
    insumoControl: new FormControl()
  });

  tipoMenuOptions: Observable<Combo[]>;
  tiposMenu: Combo[];

  insumoOptions: Observable<InsumoMenu[]>;
  insumos: InsumoMenu[];

  displayedColumns: string[] = ['insumo', 'unidadMedida', 'delete'];
  dataSource = new MatTableDataSource<InsumoMenu>();

  
  constructor(private comboService: CombosService, private insumoService: InsumoService,
    public dialog: MatDialog, public snackBar: MatSnackBar, private menuService: MenuService) { }

  ngOnInit() {
    this.getTiposMenu();
    this.getInsumos();
  }

  getTiposMenu(): void {
    this.comboService.getTiposMenu()
      .subscribe(tiposMenu => {
        this.tiposMenu = tiposMenu
        this.tipoMenuOptions = this.menuGroup.get("tipoMenuControl").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.tiposMenu, descripcion))
      );
      });
  }

  getInsumos(): void {
    this.insumoService.getInsumos()
      .subscribe(insumos => {
        this.insumos = insumos
        this.insumoOptions = this.menuGroup.get("insumoControl").valueChanges
        .pipe(
        startWith<string | InsumoMenu>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filterInsumo(descripcion))
      );
      });
  }

  displayCombo(combo: Combo) {
    if (combo) { return combo.descripcion; }
  }

  private _filter(lista: Combo[], descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return lista.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  private _filterInsumo(descripcion: string): InsumoMenu[] {
    const filterValue = descripcion.toLowerCase();

    return this.insumos.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  borrarInsumo(idInsumo): void {
    let index: number = this.dataSource.data.findIndex(d => d.id === idInsumo);
    this.dataSource.data.splice(index,1);
    this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
  }

  agregarInsumos(): void {
    var insumoSelected = this.menuGroup.get("insumoControl").value;
    if(insumoSelected){
      var isNotDuplicated = this.dataSource.data.findIndex(d => d.id === insumoSelected.id) == -1;
      console.log("valor de variable " + isNotDuplicated);
      if(isNotDuplicated){
        this.dataSource.data.push(insumoSelected);
        this.dataSource = new MatTableDataSource<InsumoMenu>(this.dataSource.data);
      } else {
        this.openSnackBar("El insumo ya se encuentra agregado", "OK");
      }
      this.reiniciarCampos();
    } else {
      this.openSnackBar("El insumo no existe", "OK");
    }
  }

  isEmptyTable() : Boolean {
    return this.dataSource.data.length == 0;
  }

  private reiniciarForm(){
    this.menuGroup.reset('',{emitEvent: false});
    Object.keys(this.menuGroup.controls).forEach((name) => {
      this.menuGroup.get(name).reset('');
      this.menuGroup.get(name).setErrors(null);
      this.menuGroup.get(name).markAsPending();
    });
    this.dataSource = new MatTableDataSource<InsumoMenu>();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private reiniciarCampos(){
    this.menuGroup.get("insumoControl").reset('');
  }

  guardar(): void {
    var dtoToSend = {} as Menu ;
    dtoToSend.nombreMenu = this.menuGroup.get("nombre").value;
    dtoToSend.tipoMenu = this.menuGroup.get("tipoMenuControl").value.id;
    dtoToSend.insumos = this.dataSource.data;

    console.log(dtoToSend);

    this.menuService.guardarMenu(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.reiniciarForm();
          this.openSnackBar("Se guardó el menú", "OK");
        }
      });
    
  }
}