import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import {DialogoCrearEjecucionComponent} from '../dialogo-crear-ejecucion/dialogo-crear-ejecucion.component'

@Component({
  selector: 'app-boton-crear',
  templateUrl: './boton-crear.component.html',
  styleUrls: ['./boton-crear.component.css']
})
export class BotonCrearComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open ( DialogoCrearEjecucionComponent, {
      width: '50%'
    } )
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed')
    })
  }
}
