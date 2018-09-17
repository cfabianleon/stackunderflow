import { Component, OnInit, Inject,Input } from '@angular/core';
//import {DialogData} from '../clientes/clientes.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {clienteEst} from '../../../interfaces/cliente.interface'
import { ApiService } from '../../../servicios/api.service';
import {estructura} from '../../../interfaces/proyecto.interface'

@Component({
  selector: 'app-dialogo-post-proyecto',
  templateUrl: './dialogo-post-proyecto.component.html',
  styleUrls: ['./dialogo-post-proyecto.component.css']
})
export class DialogoPostProyectoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoPostProyectoComponent>, 
    @Inject(MAT_DIALOG_DATA) public est: estructura,private api:ApiService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  

}
