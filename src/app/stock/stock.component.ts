import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { startWith, map } from 'rxjs/operators';
import { StockService } from '../services/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  filterControl = new FormControl();
  filteredOptions: Observable<Combo[]>;
  insumos: Combo[];

  constructor(private comboService: CombosService, private stockService: StockService) { }

  ngOnInit() {
    this.getInsumos();
  }

  getInsumos(): void {
    this.comboService.getInsumos()
      .subscribe(insumos => {
        this.insumos = insumos
        this.filteredOptions = this.filterControl.valueChanges
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

    return this.insumos.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  traerStock(): void {
    this.stockService.consultarStock(this.filterControl.value.id).subscribe(stock => {
      console.log(stock);
    });
  }
}
