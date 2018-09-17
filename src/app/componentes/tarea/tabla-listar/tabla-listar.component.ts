import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

export interface tarea {
  ID_TAREA: number,
  DESC_TAREA: string,
  HORA_ESTIMADA: number,
  FECHA_FIN_TAREA: Date,
  ESTADO: string,
  FECHA_FIN_PLANEADA: Date,
  ID_ATENCION_TAREA: number,
  ID_CONSULTOR_TAREA: number
}

@Component({
  selector: 'app-tabla-listar',
  templateUrl: './tabla-listar.component.html',
  styleUrls: ['./tabla-listar.component.css']
})

export class TablaListarComponent implements OnInit {
  tareas: any;
  cargando = true;
  displayedColumns: string[] = ['ID_TAREA', 'DESC_TAREA', 'HORA_ESTIMADA', 'FECHA_FIN_TAREA',
    'FECHA_FIN_PLANEADA', 'ESTADO', 'ID_CONSULTOR_TAREA', 'ID_ATENCION_TAREA', 'OPCIONES'];
  dataSource;
  message: string;

  constructor(private api: ApiService) {

  }



  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.api.dataSource = this.dataSource;

  }


  ngOnInit() {

    this.api.obtenerTareas().subscribe((datos) => {

      this.dataSource = new MatTableDataSource(datos.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.api.dataSource = this.dataSource;
    })
  }

  obtenerDatos() {

    this.api.obtenerTareas().subscribe((datos) => {
      this.api.dataSource = new MatTableDataSource(datos.data);
      this.api.dataSource.paginator = this.paginator;
      this.api.dataSource.sort = this.sort;
    })
  }

  receiveMessage($event) {
    this.message = $event
    if (this.message == "cerro dialogo") {
      this.obtenerDatos();
    }

  }

  yaCargo() {
    if (this.dataSource == undefined) {
      return false;
    } else {
      return true;
    }
  }
}