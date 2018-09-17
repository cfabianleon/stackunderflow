import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material'
import { DialogoPostComponent } from '../../recursos/dialogo-post/dialogo-post.component';
import {CrearRequerimientosComponent} from '../crear-requerimientos/crear-requerimientos.component';
import {} from '../../aplicacion/aplicacion.component';
@Component({
  selector: 'app-dialogo-registrar-requisito',
  templateUrl: './dialogo-registrar-requisito.component.html',
  styleUrls: ['./dialogo-registrar-requisito.component.css']
})
export class DialogoRegistrarRequisitoComponent implements OnInit {

  constructor(public dialog: MatDialog ) { }

 

  openDialog():void{
    const dialogRef = this.dialog.open(CrearRequerimientosComponent,{
      width: '40%',
    }) ;

    dialogRef.afterClosed().subscribe(result =>{
      console.log("The dialog was closed");
      console.log(result);
    });

  }
  ngOnInit() {
  }
}




