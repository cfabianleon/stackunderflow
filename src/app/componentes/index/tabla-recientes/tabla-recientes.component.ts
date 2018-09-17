import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IndexService } from '../../../servicios/index.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DialogoAddEjecucionComponent } from '../dialogo-add-ejecucion/dialogo-add-ejecucion.component';
import { MatDialog, MatPaginator } from '../../../../../node_modules/@angular/material';
import { DialogoTareaEjecucionComponent } from '../dialogo-tarea-ejecucion/dialogo-tarea-ejecucion.component';
import { DialogoCrearEjecucionComponent } from '../dialogo-crear-ejecucion/dialogo-crear-ejecucion.component';


export interface reciente{
  nombre_cliente:string,
  id_proyecto:string,
  nombre_proyecto:string,
  aplicacion:string,
  titulo_atencion:string,
  desc_tarea:string,
  id_consultor:number,
  horas_ejecutadas:number,
  hora_estimada:number
}

@Component({
  selector: 'app-tabla-recientes',
  templateUrl: './tabla-recientes.component.html',
  styleUrls: ['./tabla-recientes.component.css']
})
export class TablaRecientesComponent implements OnInit {

	recientes: any;
  displayedColumns: string[] = ['NOMBRE_CLIENTE', 'ID_PROYECTO', 'NOMBRE_PROYECTO', 'APLICACION',
  'TITULO_ATENCION','DESC_TAREA','ID_CONSULTOR','HORAS_EJECUTADAS','HORAS_ESTIMADAS','OPCIONES'];
  dataSource : MatTableDataSource<reciente>;



  refresh() {
    this.api.obtenerRecientes().subscribe((datos)=>{

      console.log(datos.data);
      this.recientes = datos.data;
      console.log(this.recientes);
      this.dataSource = new MatTableDataSource(this.recientes);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.ref.detectChanges();
    })

  }

  constructor( private api:IndexService,private ref: ChangeDetectorRef,public dialog:MatDialog) { 
    //setInterval(() =>this.refresh(), 1000);

  }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  	
    this.refresh();

  }

  openDialog(tarea): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(DialogoAddEjecucionComponent, {
      width: '40%',
      data: tarea
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  openDialogView(tarea): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(DialogoTareaEjecucionComponent, {
      width: '60%',
      data: tarea
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh()
    });
  }
   
   openDialogEjecucion(): void {
    const dialogRef = this.dialog.open ( DialogoCrearEjecucionComponent, {
      width: '50%'
    } )
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      this.refresh();
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
