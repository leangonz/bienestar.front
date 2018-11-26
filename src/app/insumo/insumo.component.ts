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
import { ActivatedRoute, Router } from '@angular/router';

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

  id: number;
  insumo: InsumoNuevo;

  constructor(private comboService: CombosService, private insumoService: InsumoService,
    public dialog: MatDialog, public snackBar: MatSnackBar,private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        if(this.id){
          console.log("precargo insumo");
          this.insumoService.buscarInsumo(this.id).subscribe(i => {
            this.insumo = i;
            this.preCargar(i);
            this.cargarCombos();
          });
        } else {

        }
     });
      
    }
  
    cargarCombos(){
      this.getUnidadMedida();
      this.getCategorias();
    }
    
    preCargar(i: InsumoNuevo): void {
      this.insumoGroup.get("nombre").setValue(i.descripcion);
    }

    
    getUnidadMedida(): void {
      this.comboService.getUnidadesMedida()
        .subscribe(unidadMedida => {
          this.unidadMedida = unidadMedida
          if(this.insumo){ 
            this.insumoGroup.get("unidadMedidaControl").setValue(unidadMedida.find(l => l.id == this.insumo.idUnidadMedida));
          }
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
          if(this.insumo){ 
            this.insumoGroup.get("categoriaControl").setValue(categoria.find(l => l.idCategoriaSecundaria == this.insumo.categoria.idCategoriaSecundaria));
          }
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
      var dtoToSend: InsumoNuevo = this.armarDataToSend();
        if(this.id){
          this.modificarInsumo(dtoToSend);
        } else {
          this.guardarInsumo(dtoToSend);
        } 
    }

    guardarInsumo(dtoToSend: InsumoNuevo){
      this.insumoService.guardarInsumo(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.reiniciarForm();
          this.openSnackBar("Se guardó el insumo", "OK");
          this.router.navigate(['/listaInsumos']);
        }
      });
    }
  
    modificarInsumo(dtoToSend: InsumoNuevo){
      this.insumoService.modificarInsumo(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.openSnackBar("Se modificó el insumo " + this.insumo.descripcion, "OK");
          this.router.navigate(['/listaInsumos']);
        }
      });
    }
    armarDataToSend(): InsumoNuevo{
      var dtoToSend = {} as InsumoNuevo ;
      if(this.id){
        //solo en modificacion
        dtoToSend.id = this.id;
      } else {
        //solo en creacion
        dtoToSend.descripcion = this.insumoGroup.get("nombre").value;
      }
      //dtoToSend.cantidad = this.insumoGroup.get("cantidad").value;
      dtoToSend.idUnidadMedida = this.insumoGroup.get("unidadMedidaControl").value.id;
      dtoToSend.categoria = this.insumoGroup.get("categoriaControl").value;
  
      console.log(dtoToSend);
      return dtoToSend;
    }
}
