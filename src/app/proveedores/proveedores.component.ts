import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { startWith, map } from 'rxjs/operators';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { Proveedor } from '../model/proveedor';
import { MatSnackBar } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  @ViewChild(FormGroupDirective) myForm;
  
  mailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  proveedorGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cuit: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern(this.mailRegex),
    ]),
    telefono: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    formaDePago: new FormControl('', Validators.required)
  });
  
  localidadOptions: Observable<Combo[]>;
  localidades: Combo[];

  formasDePagoOptions: Observable<Combo[]>;
  formasDePago: Combo[];

  constructor(private comboService: CombosService, private proveedorService: ProveedoresService,
    public snackBar: MatSnackBar) { 
    }

  ngOnInit() {
    this.getLocalidades();
    this.getFormasDePago();
  }

  getLocalidades(): void {
    this.comboService.getLocalidades()
      .subscribe(localidades => {
        this.localidades = localidades
        this.localidadOptions = this.proveedorGroup.get("localidad").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.localidades, descripcion))
      );
      });
  }
  
  getFormasDePago(): void {
    this.comboService.getFormasDePago()
      .subscribe(formasDePago => {
        this.formasDePago = formasDePago
        this.formasDePagoOptions = this.proveedorGroup.get("formaDePago").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.formasDePago, descripcion))
      );
      });
  }

  private _filter(lista: Combo[], descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return lista.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  displayCombo(combo: Combo) {
    if (combo) { return combo.descripcion; }
  }

  guardar(): void {
    var dtoToSend = {} as Proveedor ;
    dtoToSend.nombre = this.proveedorGroup.get("nombre").value;
    dtoToSend.cuit = this.proveedorGroup.get("cuit").value;
    dtoToSend.calle = this.proveedorGroup.get("calle").value;
    dtoToSend.altura = this.proveedorGroup.get("altura").value;
    dtoToSend.localidad = this.proveedorGroup.get("localidad").value.id;
    dtoToSend.mail = this.proveedorGroup.get("mail").value;
    dtoToSend.telefono = this.proveedorGroup.get("telefono").value;
    dtoToSend.contacto = this.proveedorGroup.get("contacto").value;
    dtoToSend.formaDePago = this.proveedorGroup.get("formaDePago").value.id;

    console.log(dtoToSend);

    this.proveedorService.guardarProveedor(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.reiniciarForm();
          this.openSnackBar("Se creó el proveedor " + dtoToSend.nombre ,"OK");
        }
      });
  }

  private reiniciarForm(){
    this.proveedorGroup.reset('',{emitEvent: false});
     Object.keys(this.proveedorGroup.controls).forEach((name) => {
       this.proveedorGroup.get(name).reset('');
       this.proveedorGroup.get(name).setErrors(null);
       this.proveedorGroup.get(name).markAsPending();
     });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
