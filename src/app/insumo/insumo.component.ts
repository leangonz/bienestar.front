import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { InsumoService } from '../services/insumos/insumo.service';
import { startWith, map } from 'rxjs/operators';
import { Categoria } from '../model/categoria';
import { InsumoNuevo } from '../model/InsumoNuevo';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements OnInit {

  insumoGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoriaControl: new FormControl('', Validators.required),
    unidadMedidaControl: new FormControl('', Validators.required)
  });

  categoriaOptions: Observable<Categoria[]>;
  categoria: Categoria[];

  unidadMedidaOptions: Observable<Combo[]>;
  unidadMedida: Combo[];

  constructor(private comboService: CombosService, private insumoService: InsumoService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.getUnidadMedida();
      this.getCategorias();
    }
  
    getUnidadMedida(): void {
      this.comboService.getUnidadesMedida()
        .subscribe(unidadMedida => {
          this.unidadMedida = unidadMedida
          this.unidadMedidaOptions = this.insumoGroup.get("unidadMedidaControl").valueChanges
          .pipe(
          startWith<string | Combo>(''),
          map(value => typeof value === 'string' ? value : value.descripcion),
          map(descripcion => this._filter(this.unidadMedida, descripcion))
        );
        });
    }
  
    getCategorias(): void {
      this.comboService.getCategoriasComedor()
        .subscribe(categoria => {
          this.categoria = categoria
          this.categoriaOptions = this.insumoGroup.get("categoriaControl").valueChanges
          .pipe(
          startWith<string | Categoria>(''),
          map(value => typeof value === 'string' ? value : value.descripcion),
          map(descripcion => this._filterCategoria(descripcion))
        );
        });
    }
  
    displayCombo(combo: Combo) {
      if (combo) { return combo.descripcion; }
    }
  
    displayCategoria(categoria: Categoria) {
      if (categoria) { return categoria.descripcion; }
    }

    private _filter(lista: Combo[], descripcion: string): Combo[] {
      const filterValue = descripcion.toLowerCase();
  
      return lista.filter(option => option.descripcion.toLowerCase().includes(filterValue));
    }
  
    private _filterCategoria(descripcion: string): Categoria[] {
      const filterValue = descripcion.toLowerCase();
  
      return this.categoria.filter(option => option.descripcion.toLowerCase().includes(filterValue));
    }
  
    private reiniciarForm(){
      this.insumoGroup.reset('',{emitEvent: false});
      Object.keys(this.insumoGroup.controls).forEach((name) => {
        this.insumoGroup.get(name).reset('');
        this.insumoGroup.get(name).setErrors(null);
        this.insumoGroup.get(name).markAsPending();
      });
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 5000,
      });
    }
  
    guardar(): void {
      var dtoToSend = {} as InsumoNuevo;
      dtoToSend.descripcion = this.insumoGroup.get("nombre").value;
      //dtoToSend.cantidad = this.insumoGroup.get("cantidad").value;
      dtoToSend.idUnidadMedida = this.insumoGroup.get("unidadMedidaControl").value.id;
      dtoToSend.categoria = this.insumoGroup.get("categoriaControl").value;
      
      console.log(dtoToSend);
  
      this.insumoService.guardarInsumo(dtoToSend)
        .subscribe(resultado => {
          console.log(resultado);
          if(resultado){
            this.reiniciarForm();
            this.openSnackBar("Se guardó el menú", "OK");
          }
        });
      
    }
}
