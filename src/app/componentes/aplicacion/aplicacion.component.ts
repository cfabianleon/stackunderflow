import { Component, OnInit, ViewChild } from '@angular/core';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {

  aplicaciones : any
  displayedColumns : string[] = ['ID_APLICACION', 'APLICACION', 'ID_APLICACION_SERVICIO','RESPONSABLE_APLICACION', 'OPCIONES'];
  dataSource;

  constructor( private aplicacion:AplicacionService ) { 
    this.obtenerDatos();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    
  }


  obtenerDatos(){
    this.aplicacion.obtenerAplicaciones().subscribe((datos)=>{
      this.aplicaciones = datos.data;  
      console.log(this.aplicaciones)
      this.dataSource = new MatTableDataSource(this.aplicaciones);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.aplicacion.dataSource = this.dataSource;  
      })
  }

  applyFilter(filterValue: string) {
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.aplicacion.dataSource = this.dataSource;
  }

  yaCargo() {
    if (this.dataSource == undefined) {
      return false;
    } else {
      return true;
    }
  }

}
