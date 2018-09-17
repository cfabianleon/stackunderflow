import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import {ConsultorService} from '../../../servicios/consultor.service';
import {Consultor} from '../../../interfaces/recursos.interfaces'
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-dialogo-post',
  templateUrl: './dialogo-post.component.html',
  styleUrls: ['./dialogo-post.component.css'],
  providers:[ConsultorService]
})
export class DialogoPostComponent implements OnInit {

  public globalRepsonse; any
  isFailedMessage: boolean=false
  isSuccessMessage: boolean=false
  message: any

  consultorForm: FormGroup
  inputConsultor: Consultor

  constructor(private toastr: ToastrService,private dialogRef: MatDialogRef<DialogoPostComponent>, fb: FormBuilder, private api: ConsultorService) {
    this.consultorForm = fb.group({
      id_consultor: ["", Validators.required],
      nombre_consultor: ["", Validators.required],
      bluepage: ["", Validators.required],
      id_est_consultor: 2,
      banda_consultor: ["", Validators.required],
      costo_hora: ["", Validators.required],
      rol: ["", Validators.required],
      correo: ["", Validators.email],
      password: ["", Validators.required]
    })    
  }

  ngOnInit() {
  }


  save() {
    // this.dialogRef.close("Exito");
    this.inputConsultor = this.consultorForm.value
    console.log(this.inputConsultor)
    this.api.crearConsultor(this.inputConsultor).subscribe((result)=>{
        this.toastr.success('Se creo un consultor con exito! ', 'Mensaje');
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
