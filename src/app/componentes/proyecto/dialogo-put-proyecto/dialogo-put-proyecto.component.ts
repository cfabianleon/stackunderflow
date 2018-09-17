import { Component, OnInit, Inject,Input } from '@angular/core';
//import {DialogData} from '../clientes/clientes.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {clienteEst} from '../../../interfaces/cliente.interface'
import { ApiService } from '../../../servicios/api.service';
import {estructura} from '../../../interfaces/proyecto.interface'



@Component({
  selector: 'app-dialogo-put-proyecto',
  templateUrl: './dialogo-put-proyecto.component.html',
  styleUrls: ['./dialogo-put-proyecto.component.css']
})
export class DialogoPutProyectoComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogoPutProyectoComponent>, 
    @Inject(MAT_DIALOG_DATA) public est: estructura,private api:ApiService, public dialog: MatDialog) { }

  ngOnInit() {
  }

}
