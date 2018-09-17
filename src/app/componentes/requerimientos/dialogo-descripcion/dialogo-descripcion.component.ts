import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogo-descripcion',
  templateUrl: './dialogo-descripcion.component.html',
  styleUrls: ['./dialogo-descripcion.component.css']
})
export class DialogoDescripcionComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogoDescripcionComponent>) { }

  ngOnInit() {
    console.log(this.data)
  }
  
  close() {
    this.dialogRef.close();
  }
}
