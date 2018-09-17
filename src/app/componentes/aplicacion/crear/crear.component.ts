import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AplicacionService } from '../../../servicios/aplicacion.service'
import { aplicacion } from '../../../interfaces/aplicacion.interface'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public globalRepsonse; any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any
  listaProyectos: any
  proyectos: any
  aplicacionForm: FormGroup
  linProyecto: any
  inputAplicacion: aplicacion

  constructor( private dialogRef: MatDialogRef<CrearComponent>, fb: FormBuilder, private api: AplicacionService  ) {
    this.aplicacionForm = fb.group({
      nombre_aplicacion: ["", Validators.required],
      responsable: ["", Validators.required],
      servicio: ["", Validators.required],
      proyecto: ["", Validators.required]
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

  save() {
    // this.dialogRef.close("Exito");
    this.inputAplicacion = this.aplicacionForm.value
    console.log(this.inputAplicacion)
    this.api.crearAplicacion(this.inputAplicacion).subscribe((result)=>{
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

}
