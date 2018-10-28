import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IngresoMenuRealizadoComponent } from '../ingreso-menu-realizado/ingreso-menu-realizado.component';
import { InsumoMenu } from '../model/insumo';
import { Combo } from '../model/combo';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { CombosService } from '../services/combos/combos.service';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { InsumoService } from '../services/insumos/insumo.service';

@Component({
  selector: 'app-buscador-insumos',
  templateUrl: './buscador-insumos.component.html',
  styleUrls: ['./buscador-insumos.component.css']
})
export class BuscadorInsumosComponent implements OnInit {

  form = new FormControl();
  filteredOptions: Observable<InsumoMenu[]>;
  insumos: InsumoMenu[];
  selectedItem: InsumoMenu;

  constructor(private insumoService: InsumoService,
    public dialogRef: MatDialogRef<IngresoMenuRealizadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InsumoMenu) { }

  ngOnInit() {
    this.getInsumos();
  }

  getInsumos(): void {
    this.insumoService.getInsumos()
      .subscribe(insumos => {
        this.insumos = insumos
        this.filteredOptions = this.form.valueChanges
        .pipe(
        startWith<string | InsumoMenu>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
      });
  }

  displayMenues(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(descripcion: string): InsumoMenu[] {
    const filterValue = descripcion.toLowerCase();

    return this.insumos.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
