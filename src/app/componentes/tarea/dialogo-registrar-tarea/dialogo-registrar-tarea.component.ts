import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material'
import { DialogoPostComponent } from '../../recursos/dialogo-post/dialogo-post.component';
import { RegistrarTareaComponent } from '../registrar-tarea/registrar-tarea.component';
@Component({
  selector: 'app-dialogo-registrar-tarea',
  templateUrl: './dialogo-registrar-tarea.component.html',
  styleUrls: ['./dialogo-registrar-tarea.component.css']
})
export class DialogoRegistrarTareaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Output() messageEvent = new EventEmitter<string>();

  message: string = "cerro dialogo"


  sendMessage() {
    this.messageEvent.emit(this.message)
  }
  openDialog():void{
    const dialogRef = this.dialog.open(RegistrarTareaComponent,{
      width: '40%',
    }) ;

    dialogRef.afterClosed().subscribe(result =>{
      this.messageEvent.emit(this.message);

    });

  }

}
