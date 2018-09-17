import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {ReportesService} from '../../../servicios/reportes.service';
import {ExcelService} from '../../../servicios/excel-service.service';
import { dashCaseToCamelCase } from '../../../../../node_modules/@angular/compiler/src/util';
// import {MatSort} from '@angular/material';


@Component({
  selector: 'app-tabla-costos',
  templateUrl: './tabla-costos.component.html',
  styleUrls: ['./tabla-costos.component.css']
})
export class TablaCostosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;  

  @ViewChild(MatPaginator) paginator: MatPaginator;


  lista = [];
  dataSource;
  displayedColumns: string[] = ['Aplicacion', 'Tipo', 'Titulo', 'Costo'];
  constructor(private api:ReportesService, private excel:ExcelService) { 

  }


  ngOnInit() {
            
    this.api.getTablaCostos().subscribe((datos:any)=>{
      console.log(datos.data)
      this.dataSource = new MatTableDataSource(datos.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  exportarExcel(){
      this.excel.exportAsExcelFile(this.lista, 'Reporte costos requerimientos');
   
  }


}
