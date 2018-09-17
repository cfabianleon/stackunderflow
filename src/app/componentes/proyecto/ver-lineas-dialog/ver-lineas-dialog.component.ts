import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import {VerLineasComponent } from '../ver-lineas/ver-lineas.component';

@Component({
  selector: 'app-ver-lineas-dialog',
  templateUrl: './ver-lineas-dialog.component.html',
  styleUrls: ['./ver-lineas-dialog.component.css']
})
export class VerLineasDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input ('proyecto') proyecto: any []

  ngOnInit() {
    // console.log(this.proyecto)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerLineasComponent, {
      width: '40%',
      data: this.proyecto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }



}
