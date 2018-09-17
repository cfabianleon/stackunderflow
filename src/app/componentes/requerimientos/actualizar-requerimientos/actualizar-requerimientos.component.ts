import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '../../../../../node_modules/@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { atencion } from '../../../interfaces/atencion.interface';
import { ToastrService } from 'ngx-toastr';
import { AtencionService } from '../../../servicios/atencion.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-actualizar-requerimientos',
  templateUrl: './actualizar-requerimientos.component.html',
  styleUrls: ['./actualizar-requerimientos.component.css']
})
export class ActualizarRequerimientosComponent implements OnInit {

  atencion:any
  proyectos;
  listaProyectos = [];
  linProyecto:any
  aplicacionP:any
  requerimientoP:any
 


  public globalRepsonse: any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any

  consultorForm: FormGroup
  inputAtencion: any
  tarea:any

  constructor(private dialog: MatDialog,private toastr: ToastrService,private dialogRef:MatDialogRef<ActualizarRequerimientosComponent>, fb: FormBuilder, private api: AtencionService, public  dialogCrearApp:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
     
           
      this.consultorForm = fb.group({
        tipo_atencion: ['', Validators.nullValidator],
        titulo_atencion:["",Validators.nullValidator],
        descripcion_atencion :["",Validators.nullValidator],
        fechaEsp:["",Validators.nullValidator]
      })   
    }

  ngOnInit() {
    this.api.obtenerProyectos().subscribe((datos)=>{
      this.listaProyectos = datos.data;
      this.proyectos = new MatTableDataSource( datos.data);
    })
    this.consultorForm.controls["tipo_atencion"].setValue(this.data.TIPO_ATENCION);
    this.consultorForm.controls["titulo_atencion"].setValue(this.data.TITULO_ATENCION);
    this.consultorForm.controls["descripcion_atencion"].setValue(this.data.DESCRIPCION_ATENCION);
    this.consultorForm.controls["fechaEsp"].setValue(this.data.FECHA_ESPERADA);
  }


  lineasProyecto(id:any):void {
    
    
    this.api.obtenerLineasProyecto(id).subscribe((datos)=>{
      this.linProyecto = datos.data;
     
    })
  }

  aplicacionesLneasP(id2:any):void{
    
    this.api.obtenerAplicacionesLinea(id2).subscribe((datos)=>{
      this.aplicacionP = datos.data;

  })
}


actualizarAtencion() {
  this.inputAtencion = this.consultorForm.value;
  var date = new Date(this.inputAtencion.fechaEsp);
  var convertedDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD-00.00.00.000000");
  console.log(this.data)
  this.atencion = {
    id: this.data.ID_ATENCION,
    descripcion: this.inputAtencion.descripcion_atencion,
    titulo: this.inputAtencion.titulo_atencion,
    tipo: this.inputAtencion.tipo_atencion,
    fecha_esperada: convertedDate,
    estado: this.data.ESTADO
  }

  this.api.actualizarRequerimiento(this.atencion).subscribe((result)=>{

      console.log(result)
      this.globalRepsonse = result
    },
    error => {
      console.log(error)
      this.isFailedMessage=true
      this.message = "Error en la insersion"
    },
    () => {
      this.isSuccessMessage = true
      this.message = "Se completo la insercion"
    }
  )
  this.dialogRef.close();
}

close() {
  this.dialogRef.close();
}

requerimientoAplicacionP(idAplicacion){
  this.api.atencionesxaplicacion(idAplicacion).subscribe((datos)=>{
    this.requerimientoP = datos.data;
    console.log(this.requerimientoP);
  })
}
  
}
