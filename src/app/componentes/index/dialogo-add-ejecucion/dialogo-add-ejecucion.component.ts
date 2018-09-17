import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { Ejecucion } from '../../../interfaces/ejecucion.interface';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import { EjecucionService } from '../../../servicios/ejecuccion/ejecucion.service';
import { IndexService } from '../../../servicios/index.service';



@Component({
  selector: 'app-dialogo-add-ejecucion',
  templateUrl: './dialogo-add-ejecucion.component.html',
  styleUrls: ['./dialogo-add-ejecucion.component.css']
})
export class DialogoAddEjecucionComponent implements OnInit {

	  public globalRepsonse; any
	  isFailedMessage: boolean=false
	  isSuccessMessage: boolean=false
	  message: any

	  ejecucionForm: FormGroup
	  inputEjecucion: Ejecucion

	  tarea:any;


  constructor( private dialogRef: MatDialogRef<DialogoAddEjecucionComponent>, fb: FormBuilder, private api: EjecucionService,
  	@Inject(MAT_DIALOG_DATA) public data: any,private index:IndexService) { 
  		this.tarea= data;
      console.log(data);
  		 this.ejecucionForm = fb.group({
	      num_horas: ["", Validators.required],
	      obs_ejecucion: ["", Validators.required],
	      id_tarea_ejecucion: this.tarea.ID_TAREA
	    })    
  }

  ngOnInit() {
  	console.log(this.inputEjecucion);

  }
  save() {
    // this.dialogRef.close("Exito");
    this.inputEjecucion = this.ejecucionForm.value
    console.log(this.inputEjecucion)
    this.api.postEjecuccion(this.inputEjecucion.num_horas,this.inputEjecucion.obs_ejecucion,this.data.ID_TAREA).subscribe((result)=>{
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
        this.ngOnInit();
        this.index.obtenerRecientes();
      }
    )
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}
