import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../clientes/clientes.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { clienteEst } from '../../../interfaces/cliente.interface'
// import { ApiService } from '../../../servicios/api.service';
import { clienteAc } from '../../../interfaces/clienteAc.interface';
import { ServiciosClienteService } from '../../../servicios/servicios-cliente.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clientes-post-dialog',
  templateUrl: './clientes-post-dialog.component.html',
  styleUrls: ['./clientes-post-dialog.component.css']
})
export class ClientesPostDialogComponent {


  // constructor( private api:ApiService, private dialogRef:MatDialogRef<DialogoActualizarTareaComponent>,fb:FormBuilder,
  //   @Inject(MAT_DIALOG_DATA) public data: any ) {
  //     this.tareaForm = fb.group({
  //       id_tarea: data.ID_TAREA,
  //       desc_tarea: ["",Validators.required]
  //     })
  //    }
  crearClienteForm: FormGroup
  constructor(private toastr: ToastrService,
    public dialogRef: MatDialogRef<ClientesPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private api: ServiciosClienteService, public dialog: MatDialog, fb: FormBuilder) {
    this.crearClienteForm = fb.group({
      nombre_cliente: ["", Validators.required, "", Validators.nullValidator],
      usuario: [""],
      password: [""]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarDatosCrear(nombre, usuario, password) {

    let estructura: clienteEst = {
      nombre_cliente: nombre.value,
      usuario: usuario.value,
      password: password.value
    }
    this.api.crearClientes(estructura).subscribe((algo) => {
      this.toastr.success(' Cliente ' + nombre.value + ' ha sido creado ', 'Mensaje');
    });
    this.dialogRef.close();
    return false;

  }


  // enviarDatosActualizar (nombre){
  //   let estructura: clienteEst ={
  //   nombre_cliente: nombre.value

  //   }
  //   alert(JSON.stringify(estructura))
  //   this.api.actualizarClientes(estructura).subscribe((algo)=>{
  //     alert(JSON.stringify(algo))
  //   });
  //   this.dialogRef.close();
  //   return false;

  // }

}


