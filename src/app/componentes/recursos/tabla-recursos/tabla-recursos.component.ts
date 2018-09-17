
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultorService } from '../../../servicios/consultor.service';
import { RolguardService } from '../../../servicios/rolguard.service'
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface Consultor {

  NOMBRE_CONSULTOR: string;
  ID_CONSULTOR: string;
  BLUEPAGE: string;
  ID_EST_CONSULTOR: number
}

@Component({
  selector: 'app-tabla-recursos',
  templateUrl: './tabla-recursos.component.html',
  styleUrls: ['./tabla-recursos.component.css']
})
export class TablaRecursosComponent implements OnInit {


  consultores: any
  displayedColumns: string[] = ['ID_CONSULTOR', 'NOMBRE_CONSULTOR', 'BLUEPAGE', 'ID_EST_CONSULTOR', 'OPCIONES'];
  dataSource;

  constructor(private api: ConsultorService, public seguridad: RolguardService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.api.obtenerConsultores().subscribe((datos) => {
      this.consultores = datos.data;
      this.dataSource = new MatTableDataSource(this.consultores);
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