import {Component, OnInit} from '@angular/core';
import { AtencionService } from '../../../servicios/atencion.service';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import {ApiProyectoService} from '../../../servicios/api-proyecto.service';
import { BotonCrearComponent } from '../boton-crear/boton-crear.component';
import { FormControl, Validators, FormGroup, ReactiveFormsModule,FormBuilder} from '@angular/forms';
import {EjecucionService} from '../../../servicios/ejecuccion/ejecucion.service'
import { ToastrService } from 'ngx-toastr';
import { RolguardService } from '../../../servicios/rolguard.service'


@Component({
  selector: 'app-dialogo-crear-ejecucion',
  templateUrl: './dialogo-crear-ejecucion.component.html',
  styleUrls: ['./dialogo-crear-ejecucion.component.css']
})
export class DialogoCrearEjecucionComponent implements OnInit {
  atenciones;
  proyectos;
  aplicaciones;
  tareas;
  seleccionado;
  ejecucionForm: FormGroup;
  eProyecto;eAplicacion;eAtencion;eTarea;
  miId;

  constructor(private ejec: EjecucionService,  private dialogRef: MatDialogRef<BotonCrearComponent>,
    private reque: AtencionService, private proyec: ApiProyectoService, fb: FormBuilder,private toastr: ToastrService, private yo:RolguardService) {
      
      this.miId=this.yo.idNombre().id;
      console.log(this.miId);
      this.ejecucionForm = fb.group({
        fProyecto: ['',Validators.nullValidator],
        fAplicacion: ['',Validators.nullValidator],
        fAtencion:['',Validators.nullValidator],
        fTarea:['',Validators.nullValidator],
        fFecha:['',Validators.nullValidator],
        fHoras:['',Validators.nullValidator],
        fObser:['',Validators.nullValidator]
      })
  }

  ngOnInit() {
    this.proyectos = this.getProyectos();
    this.eProyecto = true;
    this.eAplicacion= false;
    this.eAtencion = false;
    this.eTarea = false;
  }

  getProyectos() {
    this.proyec.obtenerProyectos()
      .subscribe(data => {
        console.log(data);
        this.proyectos = data.data;
      });
  }
  getAplicaciones(id) {
    this.proyec.obtenerAplicaciones(id)
      .subscribe( (data => {
        console.log(data);
        this.aplicaciones = data.data;
        this.eProyecto = false;
        this.eAplicacion= true;
      }));
  }

  getAtenciones(id) {
    this.reque.atencionesxaplicacion(id)
      .subscribe(data => {
        this.atenciones = data.data
        this.eAplicacion= false;
        this.eAtencion = true;
      });
  }
  getTareas(id) {
    this.proyec.obtenerTareas(id)
      .subscribe( data => {
        this.tareas = data.data
        console.log("tareas ------>"+this.tareas)
        console.log(data)
        this.eAtencion = false;
        this.eTarea = true;
      });
  }
  selectProyecto(p) {
    this.getAplicaciones(p.value.ID_PROYECTO);
  }

  selectAplicacion(p){
    this.getAtenciones(p.value.ID_APLICACION)
  }

  selectAtencion(p){
    this.getTareas(p.value.ID_ATENCION)
    console.log(p)
  }
  
  registrar(hora,obs,tarea){
    console.log(hora.value,obs.value,tarea.value.ID_TAREA)

    console.log("t.--> "+tarea.value.ESTADO);
    var estado = false;

    if(tarea.value.ESTADO=="Finalizada"){
      this.toastr.error('Esta Tarea ya se encuentra finalizada', 'Mensaje');
    }
    else{
      this.ejec.postEjecuccion(hora.value,obs.value,tarea.value.ID_TAREA).subscribe(data => {
      this.toastr.success(' la  ejecucion ha sido creada', 'Mensaje');
      
      console.log(data)
    })
    this.dialogRef.close();  
    }
    

  }
  cancelar() {
    this.dialogRef.close();
  }
  limpiar(){
    this.proyectos = this.getProyectos();
    this.eProyecto = true;
    this.eAplicacion= false;
    this.eAtencion = false;
    this.eTarea = false;

  }
}