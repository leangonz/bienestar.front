import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { BuscadorMenusComponent } from '../buscador-menus/buscador-menus.component';
import { Descarte } from '../model/descarte';
import { MenuCantidad } from '../model/menuCantidad';
import { DescartesService } from '../services/descarte/descartes.service';

@Component({
  selector: 'app-descarte',
  templateUrl: './descarte.component.html',
  styleUrls: ['./descarte.component.css']
})
export class DescarteComponent implements OnInit {

  descarteGroup = new FormGroup({
    fecha: new FormControl('', Validators.required)
  });

  displayedColumns: string[] = ['menu', 'cantidad', 'unidadMedida', 'delete'];
  dataSource = new MatTableDataSource<MenuCantidad>();
  
  constructor(private descarteService: DescartesService, public dialog: MatDialog,
     public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  borrarMenu(idMenu): void {
    let index: number = this.dataSource.data.findIndex(d => d.idMenu === idMenu);
    this.dataSource.data.splice(index,1);
    this.dataSource = new MatTableDataSource<MenuCantidad>(this.dataSource.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BuscadorMenusComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //agrego menu a la tabla
      var isNotDuplicated = this.dataSource.data.findIndex(d => d.idMenu === result.idMenu) == -1;
      if(result && isNotDuplicated) {
        console.log("agrego item a la tabla");
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<MenuCantidad>(this.dataSource.data);
      }
    });
  }

  guardar(): void {
    var dtoToSend = {} as Descarte ;
    dtoToSend.fecha = this.descarteGroup.get("fecha").value;
    dtoToSend.menues = this.dataSource.data;
    console.log(dtoToSend);

    this.descarteService.guardarDescarte(dtoToSend)
      .subscribe(resultado => {
        console.log(resultado);
        if(resultado){
          this.reiniciarForm();
          this.openSnackBar("Se registró el descarte en el historial", "OK");
        }
      });
  }

  private reiniciarForm(){
    this.descarteGroup.reset('',{emitEvent: false});
    Object.keys(this.descarteGroup.controls).forEach((name) => {
      this.descarteGroup.get(name).reset('');
      this.descarteGroup.get(name).setErrors(null);
      this.descarteGroup.get(name).markAsPending();
    });
    this.dataSource = new MatTableDataSource<MenuCantidad>();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
