import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSort } from '../../../../../node_modules/@angular/material';
import { ApiProyectoService } from '../../../servicios/api-proyecto.service';
import {LineaService} from '../../../servicios/linea.service'
import { LineasPostDialogComponent } from '../lineas-post-dialog/lineas-post-dialog.component';
import { MatTableDataSource,  MatPaginator  } from '@angular/material';


@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  displayedColumns: string[] = ['NOMBRE_LINEA','VALOR_HORA','ID_SERVICIO_PROYECTO','OPCIONES']
  dataSource;
  lineas: any;

  
  constructor(private api:LineaService, public dialog: MatDialog) {

   }

   message: string;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.api.obtenerLineas().subscribe((datos)=>{
      this.dataSource = new MatTableDataSource(datos.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.api.dataSource = this.dataSource;
    })
  }


  receiveMessage($event) {
    this.message = $event
    if(this.message == "cerro dialogo"){
      this.obtenerDatos();
    }

  }

  obtenerDatos(){
   
    this.api.obtenerLineas().subscribe((datos)=>{
      this.api.dataSource = new MatTableDataSource(datos.data);
      this.api.dataSource.paginator = this.paginator;
      this.api.dataSource.sort = this.sort;
    })
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.api.dataSource = this.dataSource;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openDialog(): void {
  
    const dialogRef = this.dialog.open(LineasPostDialogComponent, {
      width: '300px',
      data: {
        
      }
    });
   
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerDatos();
    });
  }

  yaCargo() {
    if (this.dataSource == undefined) {
      return false;
    } else {
      return true;
    }
  }


}
