import { Component, OnInit } from '@angular/core';
import { Consultor} from '../tabla-recursos/tabla-recursos.component';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import { ConsultorService } from '../../../servicios/consultor.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { RolguardService } from '../../../servicios/rolguard.service'
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
@Component({
  selector: 'app-dialogo-put',
  templateUrl: './dialogo-put.component.html',
  styleUrls: ['./dialogo-put.component.css'],
  providers:[ConsultorService]
})
export class DialogoPutComponent implements OnInit {

  public globalRepsonse; any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any

  consultorForm: FormGroup
  inputConsultor: Consultor

  constructor(private toastr: ToastrService,private dialogRef: MatDialogRef<DialogoPutComponent>, fb: FormBuilder, private api: ConsultorService,
     @Inject(MAT_DIALOG_DATA) public data: any, public seguridad:RolguardService) {
      this.consultorForm = fb.group({
        ids: ["", Validators.required],
        nombre: ["", Validators.required],
        bluepage: ["", Validators.required],
        id_est_consultor: data.ID_EST_CONSULTOR,
        banda: ["", Validators.required],
        costo_banda: ["", Validators.required],
        rol: ["", Validators.required],
        correo: ["", Validators.email],
        password: ["", Validators.required]
      })    
    }
    
  ngOnInit() { 
    this.rellenarCampos()
  }

  save() {
    this.inputConsultor = this.consultorForm.value
    console.log(this.inputConsultor)
    this.api.actualizarConsultor(this.inputConsultor).subscribe((result)=>{
        console.log(result)
        this.globalRepsonse = result
        this.toastr.success('Se actualizo consultor con exito! ', 'Mensaje');
      },
      error => {
        console.log(error)
        this.isFailedMessage=true
        this.message = "Error en la insercion"
      },
      () => {
        this.isSuccessMessage = true
        this.message = "Se completo la insercion"
      }
    )
    this.dialogRef.close();
  }

  close() {
    this.inputConsultor = this.consultorForm.value
    console.log(this.inputConsultor);
    this.dialogRef.close();
  }

  rellenarCampos() {
    this.consultorForm.controls['ids'].setValue(this.data.ID_CONSULTOR)
    this.consultorForm.controls['nombre'].setValue(this.data.NOMBRE_CONSULTOR)
    this.consultorForm.controls['bluepage'].setValue(this.data.BLUEPAGE)
    //this.consultorForm.controls['id_est_consultor'].setValue(this.data.ID_EST_CONSULTOR)
    this.consultorForm.controls['banda'].setValue(this.data.BANDA_CONSULTOR)
    this.consultorForm.controls['costo_banda'].setValue(this.data.COSTO_HORA)
    this.consultorForm.controls['correo'].setValue(this.data.CORREO)
    this.consultorForm.controls['password'].setValue(this.data.PASSWORD)
    this.consultorForm.controls['rol'].setValue(this.data.ROL)
  }
}
