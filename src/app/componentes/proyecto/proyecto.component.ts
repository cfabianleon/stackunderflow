import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApiProyectoService } from '../../servicios/api-proyecto.service';
import { MatSort, MatDialog, MatTab, MatTable } from '@angular/material';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component'
import { ActualizarProyectoComponent } from './actualizar-proyecto/actualizar-proyecto.component'
import { VerLineasComponent } from './ver-lineas/ver-lineas.component';
import { RolguardService } from '../../servicios/rolguard.service'
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})

export class ProyectoComponent implements OnInit {
  displayedColumns: string[] = ['ID_PROYECTO', 'ID_CLIENTE_PROYECTO', 'NOMBRE_PROYECTO', 'OPCIONES', 'LINEAS'];
  dataSource;
  proyectos: any;
  clientes: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiProyectoService, public dialog: MatDialog, public login: RolguardService) {
    this.api.obtenerProyectosMios().subscribe((datos) => {
      console.log(datos.data)
      this.dataSource = new MatTableDataSource(datos.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.api.dataSource = this.dataSource;
      // this.api.dataSource.sort = this.sort;
      // this.api.dataSource.paginator = this.paginator;
    });


    // this.obtenerDatos();
  }

  obtenerDatos() {
    this.api.obtenerProyectos().subscribe((datos) => {
      this.api.dataSource = new MatTableDataSource(datos.data);
      this.api.dataSource.sort = this.sort;
      this.api.dataSource.paginator = this.paginator;

    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.api.dataSource = this.dataSource;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearProyectoComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos();
    });
  }

  openDialogLineas(): void {
    const dialogRef = this.dialog.open(VerLineasComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos();
    });
  }

  openDialogActualizar(idp, nombre, idc): void {


    const dialogRef = this.dialog.open(ActualizarProyectoComponent, {
      width: '300px',
      data: { idp, nombre, idc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos()
      // this.applyFilter("");


    });
  }


  yaCargo() {
    if (this.dataSource == undefined) {
      return false;
    } else {
      return true;
    }
  }


  ngOnInit() {
  }

}

