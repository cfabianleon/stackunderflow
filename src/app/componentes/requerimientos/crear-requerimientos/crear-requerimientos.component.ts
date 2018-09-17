import { Component, OnInit } from '@angular/core';
import {AtencionService} from '../../../servicios/atencion.service';
import { atencion } from '../../../interfaces/atencion.interface';
import { FormControl, Validators, FormGroup, ReactiveFormsModule,FormBuilder} from '@angular/forms'
import { MatDialogRef } from '../../../../../node_modules/@angular/material'
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { Inject } from '@angular/core';
import { DialogoRegistrarRequisitoComponent} from '../dialogo-registrar-requisito/dialogo-registrar-requisito.component';
import {CrearComponent} from '../../aplicacion/crear/crear.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-crear-requerimientos',
  templateUrl: './crear-requerimientos.component.html',
  styleUrls: ['./crear-requerimientos.component.css']
})
export class CrearRequerimientosComponent implements OnInit {

  atencion:any
  proyectos;
  listaProyectos = [];
  linProyecto:any
  aplicacionP:any

  public globalRepsonse: any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any

  consultorForm: FormGroup
  inputAtencion: atencion
  tarea:any

  constructor(private toastr: ToastrService,private dialogRef:MatDialogRef<DialogoRegistrarRequisitoComponent>, fb: FormBuilder, private api: AtencionService, public  dialogCrearApp:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
     
       this.consultorForm = fb.group({
        proyectoN: ["",Validators.nullValidator],
        lineaN:["", Validators.nullValidator],
        aplicacionN: ["", Validators.nullValidator],
        tipo_atencion: ['', Validators.nullValidator],  
        id_cliente_atencion :["",Validators.nullValidator],
        titulo_atencion:["",Validators.nullValidator],
        descripcion_atencion :["",Validators.nullValidator],
        fechaEsp:["",Validators.nullValidator],
        fecha2:["",Validators.nullValidator],
        url: ""
      })      
}
  ngOnInit() {
    this.api.obtenerProyectos().subscribe((datos)=>{
      this.listaProyectos = datos.data;
      this.proyectos = new MatTableDataSource( datos.data);
    })
  }

  lineasProyecto(id:any):void {
    this.api.obtenerLineasProyecto(id).subscribe((datos)=>{
      this.linProyecto = datos.data;
     console.log(this.linProyecto)
    })
  }
  aplicacionesLneasP(id2:any):void{    
    this.api.obtenerAplicacionesLinea(id2).subscribe((datos)=>{
      this.aplicacionP = datos.data;
  })
}
  registrarAtencion(fecha_acordada,fecha_esperada, seleccion, seleccion2) {
    this.inputAtencion = this.consultorForm.value
    var convertedDate = moment(fecha_acordada.value, "DD/MM/YYYY").format("YYYY-MM-DD-00.00.00.000000");
    var convertedDate2 = moment(fecha_esperada.value, "DD/MM/YYYY").format("YYYY-MM-DD-00.00.00.000000");
    console.log(this.consultorForm.value.url);
    console.log(this.inputAtencion.url);

    this.api.postRequerimiento(seleccion2.value,parseInt( this.inputAtencion.id_cliente_atencion),
      this.inputAtencion.titulo_atencion,this.inputAtencion.descripcion_atencion,convertedDate,
      convertedDate2, seleccion.value, this.inputAtencion.url).subscribe((result)=>{

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
  registrarApp(){
     const d= this.dialogCrearApp.open(CrearComponent, {
      width: '40%',
    });

    d.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }
}

