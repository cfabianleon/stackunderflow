import { Component, OnInit , ViewChild, Inject,Input} from '@angular/core';
import { ApiProyectoService } from '../../../servicios/api-proyecto.service';
import {MatSort, MatDialog, MatDialogRef} from '@angular/material';
import {CrearProyectoComponent} from '../crear-proyecto/crear-proyecto.component'
import {ActualizarProyectoComponent} from '../actualizar-proyecto/actualizar-proyecto.component'
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-ver-lineas',
  templateUrl: './ver-lineas.component.html',
  styleUrls: ['./ver-lineas.component.css']
})
export class VerLineasComponent implements OnInit {
  // displayedColumns: string[] = ['NOMBRE_LINEA','VALOR_HORA','OPCIONES']
  displayedColumns: string[] = ['NOMBRE_LINEA','VALOR_HORA']

  dataSource: any;
  lineas: any;

  // @Input ('proyecto') proyecto: any []


  @ViewChild(MatSort) sort: MatSort;
  constructor(private api:ApiProyectoService, private dialogRef: MatDialogRef<VerLineasComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  close() {
    this.dialogRef.close();
  }

  cargarDatos(id){
    this.api.obtenerLineas(id).subscribe((datos)=>{
      console.log(datos)
      this.lineas = datos.data;
      this.dataSource = this.lineas;
      this.dataSource.sort = this.sort;
    })

    
  }

  ngOnInit() {
    this.cargarDatos(this.data.ID_PROYECTO)
  }

}
