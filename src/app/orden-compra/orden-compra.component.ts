import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combo } from '../model/combo';
import { Observable } from 'rxjs';
import { CombosService } from '../services/combos/combos.service';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { CompraItem } from '../model/compraItem';
import { Compra } from '../model/compra';
import { ComprasService } from '../services/compras/compras.service';
import { CompraResumen } from '../model/compraResumen';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

  compraGroup = new FormGroup({
    fecha: new FormControl('', Validators.required),
    factura: new FormControl('', Validators.required),
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
  
  displayedColumns: string[] = ['insumo', 'cantidad', 'precioUnitario', 'precioTotal', 'delete'];
  dataSource = new MatTableDataSource<CompraItem>();

  id: number;
  compra: Compra;

  constructor(private comboService: CombosService, private comprasService: ComprasService,
    public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        console.log("precargo proveedor");
        this.comprasService.buscarCompra(this.id).subscribe(c => {
          this.compra = c;
          this.preCargar(c);
          this.cargarCombos();
        });
      } else {
        this.cargarCombos();
      }
   });
    
  }

  cargarCombos(){
    this.getProveedores();
    this.getAreas();
    this.getCategorias();
    this.getInsumos();
  }

  preCargar(c): void {
    this.compraGroup.get("fecha").setValue(c.fecha);
    this.compraGroup.get("factura").setValue(c.factura);
    this.compraGroup.get("proveedor").value.id;
    this.compraGroup.get("area").value.id;
    this.compraGroup.get("categoria").value.id;
    this.dataSource = new MatTableDataSource<CompraItem>(this.compra.items);
  }

  getProveedores(): void {
    this.comboService.getProveedoresActivos()
      .subscribe(proveedores => {
        this.proveedores = proveedores
        if(this.compra){ 
          //armo el obj a mano xq es posible q el proveedor este eliminado
          this.compraGroup.get("proveedor").setValue({id:this.compra.proveedor, descripcion:this.compra.descProveedor});
        }
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
        if(this.compra){ 
          this.compraGroup.get("area").setValue(areas.find(l => l.id == +this.compra.area));
        }
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
        if(this.compra){ 
          this.compraGroup.get("categoria").setValue(categorias.find(l => l.id == +this.compra.categoria));
        }
        this.categoriaOptions = this.compraGroup.get("categoria").valueChanges
        .pipe(
        startWith<string | Combo>(''),
        map(value => typeof value === 'string' ? value : value.descripcion),
        map(descripcion => this._filter(this.categorias, descripcion))
      );
      });
  }

  getInsumos(): void {
    this.comboService.getInsumosActivos()
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
    var id = this.compraGroup.get("insumo").value.id;
    var isNotDuplicated = this.dataSource.data.findIndex(d => d.insumo === id) == -1;
    if(id){
      if(isNotDuplicated){
        var item = {} as CompraItem;
        item.cantidad = this.compraGroup.get("cantidad").value;
        item.insumo = id;
        item.descripcion = this.compraGroup.get("insumo").value.descripcion;
        item.precioUnitario = this.compraGroup.get("precioUnitario").value;
        item.precioTotal = item.cantidad * item.precioUnitario;
        this.dataSource.data.push(item);
        this.dataSource = new MatTableDataSource<CompraItem>(this.dataSource.data);
      } else {
        this.openSnackBar("El insumo ya se encuentra agregado", "OK");
      }
      this.reiniciarCampos();
    } else {
      this.openSnackBar("El insumo no existe", "OK");
    }
  }

  borrarItem(idItem): void {
    let index: number = this.dataSource.data.findIndex(d => d.insumo === idItem);
    this.dataSource.data.splice(index,1);
    this.dataSource = new MatTableDataSource<CompraItem>(this.dataSource.data);
  }

  getTotalCost() {
    if(this.dataSource.data.length > 0){
      return this.dataSource.data.map(t => t.precioTotal).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }

  isEmptyTable() : Boolean {
    return this.dataSource.data.length == 0;
  }

  guardar(): void {
    var dtoToSend = {} as Compra ;
    dtoToSend.fecha = this.compraGroup.get("fecha").value;
    dtoToSend.factura = this.compraGroup.get("factura").value;
    dtoToSend.proveedor = this.compraGroup.get("proveedor").value.id;
    dtoToSend.area = this.compraGroup.get("area").value.id;
    dtoToSend.categoria = this.compraGroup.get("categoria").value.id;
    dtoToSend.items = this.dataSource.data;
    console.log(dtoToSend);

    this.comprasService.guardarCompra(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.reiniciarForm();
          this.openSnackBar("Se registró la compra", "OK");
        }
      });
  }

  private reiniciarForm(){
    this.compraGroup.reset('',{emitEvent: false});
    Object.keys(this.compraGroup.controls).forEach((name) => {
      this.compraGroup.get(name).reset('');
      this.compraGroup.get(name).setErrors(null);
      this.compraGroup.get(name).markAsPending();
    });
    this.dataSource = new MatTableDataSource<CompraItem>();
  }

  private reiniciarCampos(){
    this.compraGroup.get("cantidad").reset('');
    this.compraGroup.get("cantidad").setErrors(null);
    this.compraGroup.get("cantidad").markAsPending();

    this.compraGroup.get("insumo").reset('');
    this.compraGroup.get("insumo").setErrors(null);
    this.compraGroup.get("insumo").markAsPending();

    this.compraGroup.get("precioUnitario").reset('');
    this.compraGroup.get("precioUnitario").setErrors(null);
    this.compraGroup.get("precioUnitario").markAsPending();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
