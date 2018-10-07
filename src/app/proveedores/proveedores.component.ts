import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedorGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cuit: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    formaDePago: new FormControl('', Validators.required)
  });
  
  localidadOptions: Observable<Combo[]>;
  localidades: Combo[];

  formasDePagoOptions: Observable<Combo[]>;
  formasDePago: Combo[];

  constructor(private comboService: CombosService) { }

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

  }
}
