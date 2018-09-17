import { Component, OnInit, Inject, ViewChild } from '@angular/core';
// import { ApiService } from '../../../servicios/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort, MatPaginator } from '../../../../../node_modules/@angular/material';
import { DialogData } from '../clientes/clientes.component'
import { clienteEst } from '../../../interfaces/cliente.interface'
import { clienteAc } from '../../../interfaces/clienteAc.interface';
import { ServiciosClienteService } from '../../../servicios/servicios-cliente.service';
import { FormBuilder, FormGroup, Validators } from '../../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';


@Component({
  selector: 'app-clientes-put-dialog',
  templateUrl: './clientes-put-dialog.component.html',
  styleUrls: ['./clientes-put-dialog.component.css']

})

export class ClientesPutDialogComponent implements OnInit {
  crearClientePutForm: FormGroup


  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<ClientesPutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private api: ServiciosClienteService, public dialog: MatDialog, fb: FormBuilder) {
    this.crearClientePutForm = fb.group({
      id_cliente: ["", Validators.required, "", Validators.nullValidator],
      nombre_cliente: ["", Validators.required, "", Validators.nullValidator],
      usuario: [""],
      password: [""]

    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  llenarCampos() {
    this.crearClientePutForm.controls['id_cliente'].setValue(this.data.id)
    this.crearClientePutForm.controls['nombre_cliente'].setValue(this.data.nombre_cliente)
    this.crearClientePutForm.controls['usuario'].setValue(this.data.usuario)
    if (this.data.password != "undefined") {
      this.crearClientePutForm.controls['password'].setValue(this.data.password)
    }
    else {
      this.crearClientePutForm.controls['password'].setValue("")
    }
  }

  ngOnInit() {
    console.log(this.data)
    this.llenarCampos();
  }


  enviarDatosActualizar(id, nombre, usuario, password) {
    let estructura: clienteEst = {
      id: id.value,
      nombre_cliente: nombre.value,
      usuario: usuario.value,
      password: password.value
    }

    this.api.actualizarClientes(estructura).subscribe((algo) => {
      this.toastr.success('el cliente con el id: ' + id.value + ' ha sido modificado por ' + nombre.value, 'Mensaje');

    });

    this.dialogRef.close();
    return false;

  }

}
