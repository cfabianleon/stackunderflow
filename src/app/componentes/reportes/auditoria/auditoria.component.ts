import { Component, OnInit, ViewChild} from '@angular/core';
// import {MatTableDataSource} from '@angular/material';
import {ReportesService} from '../../../servicios/reportes.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  lista = [];
  dataSource;
  displayedColumns: string[] = ['NOMBRE_USUARIO','FECHA_HORA','ANTES','DESPUES','TABLA','ACCION','COLUMNA'];

  constructor(private api:ReportesService) { }

  ngOnInit() {
    this.api.getTablaAuditoria().subscribe((datos:any)=>{
      this.lista = datos.data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.sort = this.sort)
      this.dataSource.paginator = this.paginator;
    })
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }

}
