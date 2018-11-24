import { Component, OnInit } from '@angular/core';
import { Combo } from '../model/combo';
import { Menu } from '../model/menu';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { CombosService } from '../services/combos/combos.service';
import { MenuService } from '../services/menu/menu.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-menus',
  templateUrl: './listado-menus.component.html',
  styleUrls: ['./listado-menus.component.css']
})
export class ListadoMenusComponent implements OnInit {

  menuControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  menus: Combo[];

  displayedColumns: string[] = ['nombre', 'tipo', 'modificar', 'eliminar'];
  dataSource = new MatTableDataSource<Menu>();

  constructor(private comboService: CombosService, private proveedoresService: MenuService) { }

  ngOnInit() {
    this.getMenus();
    this.fillTable();
  }

  getMenus(): void {
    this.comboService.getMenues()
      .subscribe(menus => {
        this.menus = menus
        this.filteredOptions = this.menuControl.valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(descripcion))
      );
    });
  }

  displayCombo(menu: Combo) {
    if (menu) { return menu.descripcion; }
  }

  private _filter(descripcion: string): Combo[] {
    const filterValue = descripcion.toLowerCase();

    return this.menus.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  fillTable(): void {
    this.buscarMenus(null);
  }

  buscarMenus(id): void {
    this.proveedoresService.filtrarMenu(id).subscribe(menus => {
      console.log(menus);
      this.dataSource = new MatTableDataSource<Menu>(menus);
    });
  }

  filtrarMenus(): void {
    var id = null
    if(this.menuControl.value){
     id = this.menuControl.value.id;
    }    
    this.buscarMenus(id);   
  }

}
