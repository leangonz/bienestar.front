import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { CompraItem } from '../model/compraItem';
import { Compra } from '../model/compra';
import { ComprasService } from '../services/compras/compras.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

  compraGroup = new FormGroup({
    fecha: new FormControl('', Validators.required),
    proveedor: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    insumo: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    precioUnitario: new FormControl('', Validators.required)
  });

  proveedorOptions: Observable<Combo[]>;
  proveedores: Combo[];

  areaOptions: Observable<Combo[]>;
  areas: Combo[];

  categoriaOptions: Observable<Combo[]>;
  categorias: Combo[];

  insumoOptions: Observable<Combo[]>;
  insumos: Combo[];
  
  displayedColumns: string[] = ['insumo', 'cantidad', 'precioUnitario', 'precioTotal'];
  dataSource = new MatTableDataSource<CompraItem>();

  constructor(private comboService: CombosService, private comprasService: ComprasService) { }

  ngOnInit() {
    this.getProveedores();
    this.getAreas();
    this.getCategorias();
    this.getInsumos();
  }

  getProveedores(): void {
    this.comboService.getProveedores()
      .subscribe(proveedores => {
        this.proveedores = proveedores
        this.proveedorOptions = this.compraGroup.get("proveedor").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.proveedores, descripcion))
      );
      });
  }

  getAreas(): void {
    this.comboService.getAreas()
      .subscribe(areas => {
        this.areas = areas
        this.areaOptions = this.compraGroup.get("area").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.areas, descripcion))
      );
      });
  }

  getCategorias(): void {
    this.comboService.getCategorias()
      .subscribe(categorias => {
        this.categorias = categorias
        this.categoriaOptions = this.compraGroup.get("categoria").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.categorias, descripcion))
      );
      });
  }

  getInsumos(): void {
    this.comboService.getInsumos()
      .subscribe(insumos => {
        this.insumos = insumos
        this.insumoOptions = this.compraGroup.get("insumo").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.insumos, descripcion))
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

  agregarItem(): void {
    var item = {} as CompraItem;
    item.cantidad = this.compraGroup.get("cantidad").value;
    item.insumo = this.compraGroup.get("insumo").value.id;
    item.precioUnitario = this.compraGroup.get("precioUnitario").value;
    item.precioTotal = item.cantidad * item.precioUnitario;
    this.dataSource.data.push(item);
    this.dataSource = new MatTableDataSource<CompraItem>(this.dataSource.data); 
  }

  guardar(): void {
    var dtoToSend = {} as Compra ;
    dtoToSend.fecha = this.compraGroup.get("fecha").value;
    dtoToSend.proveedor = this.compraGroup.get("proveedor").value.id;
    dtoToSend.area = this.compraGroup.get("area").value.id;
    dtoToSend.categoria = this.compraGroup.get("categoria").value.id;
    dtoToSend.items = this.dataSource.data;
    console.log(dtoToSend);

    this.comprasService.guardarCompra(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
      });
  }

}