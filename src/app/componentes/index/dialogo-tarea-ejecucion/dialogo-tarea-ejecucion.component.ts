import { Component, OnInit } from '@angular/core';
import { EjecucionService } from '../../../servicios/ejecuccion/ejecucion.service';
import {MatSort} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export interface ejecucion{
  num_horas:number,
  fecha_registro:string,
  obs_ejecucion:string,
  
}

@Component({
  selector: 'app-dialogo-tarea-ejecucion',
  templateUrl: './dialogo-tarea-ejecucion.component.html',
  styleUrls: ['./dialogo-tarea-ejecucion.component.css']
})


export class DialogoTareaEjecucionComponent implements OnInit {

	ejecuciones:any[];
	displayedColumns: string[] = ['NUM_HORAS', 'FECHA_REGISTRO', 'OBS_EJECUCION','OPCIONES'];
  dataSource;
	tareaForm: FormGroup
	tareas:any;

  constructor(private api:EjecucionService, @Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) {
  	this.tareas= data;	
   }

  ngOnInit() {
  	this.api.obtenerEjecuciones(this.tareas.ID_TAREA).subscribe((datos)=>{

  		console.log(datos.data);
      this.ejecuciones = datos.data;
      console.log(this.ejecuciones);
      this.dataSource = this.ejecuciones;
      console.log(this.dataSource);
    })
  }

   edit(id){
     //alert(id);
     let num_horas =document.getElementById("num_horas_"+id) as HTMLInputElement;
     //console.log();
     var obs =document.getElementById("obs_"+id) as HTMLInputElement;
     //alert(num_horas);
     if(num_horas.value!="" && obs.value.trim()!="" ){
      this.findEjecucion(id,num_horas.value,obs.value);
     }
     else{
      this.toastr.warning(' los campos no pueden estar vacios ', 'Mensaje');

     }
     
     //alert(num_horas);
   }

   findEjecucion(id, num_horas, obs):boolean {
  

     for (var i = this.ejecuciones.length - 1; i >= 0; i--) {
         var elemento = this.ejecuciones[i]; 
         
         if(elemento['ID_EJECUCION']==id){
         if(elemento['NUM_HORAS']!= num_horas || elemento['OBS_EJECUCION']!=obs){
           this.actualizar(id,obs,num_horas);
           return true;
         }
       } 
     }
     return false;

/*     this.ejecuciones.forEach(function(elemento){
       //alert(elemento);
       
     });
     return false;
     */
   }

   public actualizar(id, obs, num_horas){
     this.api.putEjecuccion(id,obs,num_horas).subscribe((datos)=>{
             console.log(datos.data);
             this.toastr.success(' la actualizacion correcta ', 'Mensaje');
            //  alert("Actualizacion Correcta");
          });
   }

}
