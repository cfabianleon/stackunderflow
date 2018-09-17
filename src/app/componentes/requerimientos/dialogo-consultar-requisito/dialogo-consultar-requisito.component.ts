import { Component, OnInit, ViewChild } from '@angular/core';
import { AtencionService } from '../../../servicios/atencion.service'
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface requerimientosC {
  TIPO_ATENCION: string,
  ID_CLIENTE_ATENCION: string,
  TITULO_ATENCION: string,
  DESCRIPCION_ATENCION: string,
  FECHA_ESPERADA: Date,
  FECHA_ACORDADA: Date,
  ID_APLICACION_ATENCION: number,
  ESTADO: string

}

@Component({
  selector: 'app-dialogo-consultar-requisito',
  templateUrl: './dialogo-consultar-requisito.component.html',
  styleUrls: ['./dialogo-consultar-requisito.component.css']
})

export class DialogoConsultarRequisitoComponent implements OnInit {

  requerimientos: any
  displayedColumns: string[] = ['TIPO_ATENCION', 'CLIENTE', 'TITULO_ATENCION', 'FECHA_ESPERADA', 'FECHA_ACORDADA', 'APLICACION', 'ESTADO', 'OPCIONES'];
  dataSource;

  constructor(private api: AtencionService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.api.obtenerRequerimientos().subscribe((datos) => {
      console.log(datos.data)
      this.requerimientos = datos.data;
      this.dataSource = new MatTableDataSource(this.requerimientos);
      console.log("Pruba")
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;

    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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



