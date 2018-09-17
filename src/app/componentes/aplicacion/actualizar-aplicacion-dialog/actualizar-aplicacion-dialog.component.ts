import { Component, OnInit, Input} from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import {ActualizarAplicacionComponent} from '../actualizar-aplicacion/actualizar-aplicacion.component'
import { AplicacionComponent } from '../aplicacion.component';

@Component({
  selector: 'app-actualizar-aplicacion-dialog',
  templateUrl: './actualizar-aplicacion-dialog.component.html',
  styleUrls: ['./actualizar-aplicacion-dialog.component.css']
})
export class ActualizarAplicacionDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input('aplicacion') aplicacion: any[];


  ngOnInit() {
  }

  openDialog(): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(ActualizarAplicacionComponent, {
      width: '40%',
      data: this.aplicacion
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


