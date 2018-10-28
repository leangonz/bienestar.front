import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DescarteComponent } from '../descarte/descarte.component';
import { startWith, map } from 'rxjs/operators';
import { Combo } from '../model/combo';
import { MenuCantidad } from '../model/menuCantidad';
import { DescartesService } from '../services/descarte/descartes.service';

@Component({
  selector: 'app-buscador-menus',
  templateUrl: './buscador-menus.component.html',
  styleUrls: ['./buscador-menus.component.css']
})
export class BuscadorMenusComponent implements OnInit {

  form = new FormControl();
  filteredOptions: Observable<MenuCantidad[]>;
  menues: MenuCantidad[];
  selectedItem: MenuCantidad;

  constructor(private descarteService: DescartesService,
    public dialogRef: MatDialogRef<DescarteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuCantidad) { }

  ngOnInit() {
    this.getMenues();
  }

  getMenues(): void {
    this.descarteService.getMenuesDescarte()
      .subscribe(menues => {
        this.menues = menues
        this.filteredOptions = this.form.valueChanges
        .pipe(
        startWith<string | MenuCantidad>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
      });
  }

  displayMenues(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(descripcion: string): MenuCantidad[] {
    const filterValue = descripcion.toLowerCase();

    return this.menues.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
