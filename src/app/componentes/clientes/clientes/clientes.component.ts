import { Component, OnInit, ViewChild } from '@angular/core';
// import { ApiService } from '../../../servicios/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTab } from '@angular/material';
import { ClientesPostDialogComponent } from '../clientes-post-dialog/clientes-post-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesPutDialogComponent } from '../clientes-put-dialog/clientes-put-dialog.component';
import { ServiciosClienteService } from '../../../servicios/servicios-cliente.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';




export interface DialogData {

  nombre_cliente: string;
  id?: string;
  usuario: string;
  password: string
}


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  dialogData: DialogData;
  ID_CLIENTE: string;
  NOMBRE_CLIENTE: string;
  cargando = true;
  clientes;
  displayedColumns: string[] = ['ID_CLIENTE', 'NOMBRE_CLIENTE', 'OPCIONES'];

  forma: FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ServiciosClienteService, public dialog: MatDialog) {
    // this.obtenerDatos();

    this.api.obtenerClientes().subscribe((datos) => {
      this.clientes = new MatTableDataSource(datos.data)
      this.clientes.sort = this.sort;
      this.clientes.paginator = this.paginator;
      this.api.dataSource = this.clientes;
    })
  }


  obtenerDatos() {

    this.api.obtenerClientes().subscribe((datos) => {
      this.api.dataSource = new MatTableDataSource(datos.data);
      this.api.dataSource.paginator = this.paginator;
      this.api.dataSource.sort = this.sort;
    })
  }


  openDialogActualizar(id, nombreIngresado, usuario, password): void {

    console.log(id, nombreIngresado, usuario, password)
    const dialogRef = this.dialog.open(ClientesPutDialogComponent, {
      width: '300px',
      data: {
        id: id,
        nombre_cliente: nombreIngresado,
        usuario: usuario,
        password: password
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos();
    });
  }

  applyFilter(filterValue: string) {
    this.clientes.filter = filterValue.trim().toLowerCase();
    if (this.clientes.paginator) {
      this.clientes.paginator.firstPage();
    }
    this.api.dataSource = this.clientes;

  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ClientesPostDialogComponent, {
      width: '300px'
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos();

    });
  }

  yaCargo() {
    if (this.api.dataSource == undefined) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {

  }

}



