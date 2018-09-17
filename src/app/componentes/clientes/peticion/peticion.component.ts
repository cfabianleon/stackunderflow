import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../../../servicios/file-manager.service'
import {HttpEventType} from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import {atencion} from '../../../interfaces/atencion.interface'
import {RolguardService} from '../../../servicios/rolguard.service'
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css'],
  providers: [FileManagerService]
})
export class PeticionComponent implements OnInit {
  
  archivo:File
  centinela: boolean = false
  
  public globalRepsonse: any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any

  peticionForm: FormGroup
  peticion: atencion

  fileUrl:any
  
  listaProyectos: any;
  linProyecto: any[]
  aplicacionP: any[]
  proyectos: boolean = false
  lServicio: boolean = false
  progressBar: boolean = false

  carga: number = 0
  
  constructor(private api:FileManagerService, private rol: RolguardService, fb: FormBuilder, private toastr: ToastrService) {
    this.peticionForm = fb.group({
      proyectoN: ["",Validators.required],
      lineaN:["", Validators.required],
      aplicacionN: ["", Validators.required],
      tipo_atencion: ['', Validators.required],
      id_cliente_atencion :["",Validators.required],
      titulo_atencion:["",Validators.required],
      descripcion_atencion :["",Validators.required],
      fechaEsp:["",Validators.required],
      fecha2:"",
      url: ""
    })
   }
  

  ngOnInit() {
    this.peticionForm.controls['id_cliente_atencion'].setValue(this.rol.idCliente())
    this.api.obtenerProyectos(this.peticionForm.controls['id_cliente_atencion'].value).subscribe((datos)=>{
      this.listaProyectos = datos.data;
      console.log(this.listaProyectos)
      this.toastr.success(' Si hay Proyectos ', 'Mensaje');
    })
  }

  lineasProyecto(id:any):void {
    this.api.obtenerLineasProyecto(id).subscribe((datos)=>{
      this.linProyecto = datos.data;
      console.log(this.linProyecto)
      if(this.linProyecto.length!=0){
        this.proyectos = true
        this.toastr.success(' Si hay linea ', 'Mensaje');

      }
      else {
        this.toastr.error(' No hay Lineas de Servicio ', 'Mensaje');
      }
    })
  }
  aplicacionesLneasP(id2:any):void{    
    this.api.obtenerAplicacionesLinea(id2).subscribe((datos)=>{
      this.aplicacionP = datos.data;
      console.log(this.aplicacionP)
      if(this.aplicacionP.length != 0) {
        this.lServicio = true
        this.toastr.success(' Si hay aplicaciones ', 'Mensaje');

      }
      else {
        this.toastr.error(' No hay Aplicaciones ', 'Mensaje');
      }
  })
}

  onFileSelected(event) {
    this.archivo = <File>event.target.files[0]
    this.centinela = true
    console.log(this.centinela)
  }

  cProyecto() {
    return this.proyectos
  }

  cLServicio() {
    return this.lServicio
  }

  progress() {
    return this.progressBar
  }

  centinel() {
    if(this.peticionForm.valid) {
      if(this.centinela)
      {
        return true
      }
    }
  }

  enviar(){
    this.progressBar= true
    const fd = new FormData();
    fd.append('file', this.archivo, this.archivo.name)
    this.api.uploadFile(fd).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
        this.carga = Math.round(event.loaded / event.total * 100)
        console.log(this.carga)
        console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100)+'%')
      } 
      else if(event.type === HttpEventType.Response) {
        var fileUrl = event.body.filename
        // console.log(this.peticionForm.value.fechaEsp)
        this.cargarRequerimiento(fileUrl)
        
      }
    })
  }

  cargarRequerimiento(url: string) {
    console.log(url)
    var date = new Date(this.peticionForm.value.fechaEsp)
        // console.log(date)

        var fechaMod = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD-00.00.00.000000")
        // console.log(fechaMod)

        this.peticionForm.value.fechaEsp = fechaMod
        
        this.peticionForm.value.fecha2 = this.peticionForm.value.fechaEsp
        console.log(this.peticionForm.value)
        
        this.peticionForm.value.url = url
        this.peticion = this.peticionForm.value
        this.api.postRequerimiento(this.peticion.tipo_atencion, this.peticion.id_cliente_atencion, this.peticion.tipo_atencion,
        this.peticion.descripcion_atencion, fechaMod, fechaMod, 
        this.peticionForm.value.aplicacionN, url).subscribe((result)=>{
          console.log(result)
          this.globalRepsonse = result
        }, error => {
          console.log(error)
          this.isFailedMessage=true
          this.message = "Error en la insersion"
        this.toastr.error(' Error en la insercion ', 'Mensaje');
        }, () => {
          this.isSuccessMessage = true
          this.message = "Se completo la insercion"
          this.toastr.success(' Se a creado el requerimiento ', 'Mensaje');
          window.location.reload()
        })
  }
}
