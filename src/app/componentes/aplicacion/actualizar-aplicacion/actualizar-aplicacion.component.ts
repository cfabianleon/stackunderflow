import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { RolguardService } from '../../../servicios/rolguard.service'
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import {AplicacionService} from '../../../servicios/aplicacion.service'
import { aplicacion } from '../../../interfaces/aplicacion.interface';

@Component({
  selector: 'app-actualizar-aplicacion',
  templateUrl: './actualizar-aplicacion.component.html',
  styleUrls: ['./actualizar-aplicacion.component.css']
})
export class ActualizarAplicacionComponent implements OnInit {

  aplicacionForm: FormGroup;
  inputAplicacion;

  constructor(private toastr: ToastrService,private dialogRef: MatDialogRef<ActualizarAplicacionComponent>, fb: FormBuilder, private api: AplicacionService,
    @Inject(MAT_DIALOG_DATA) public data: any, public seguridad:RolguardService) { 

      this.aplicacionForm = fb.group({
        id : ["",Validators.required],
        nombre_aplicacion : ["",Validators.required],
        servicio : ["",Validators.required],
        responsable : ["",Validators.required]

      })
      this.rellenarCampos()

    }

  ngOnInit() {
  }


  save(){
    this.inputAplicacion = this.aplicacionForm.value
    this.api.actualizarAplicacion(this.inputAplicacion).subscribe((datos)=>{
      console.log(datos)
      this.close();
      this.toastr.success('Se actualizo la aplicacion con exito! ', 'Mensaje');

    })
  }

  close() {
    this.inputAplicacion = this.aplicacionForm.value
    this.dialogRef.close();
  }

  rellenarCampos(){
    this.aplicacionForm.controls['id'].setValue(this.data.ID_APLICACION)
    this.aplicacionForm.controls['nombre_aplicacion'].setValue(this.data.APLICACION)
    this.aplicacionForm.controls['servicio'].setValue(this.data.ID_APLICACION_SERVICIO)
    this.aplicacionForm.controls['responsable'].setValue(this.data.RESPONSABLE_APLICACION)
  }
}
