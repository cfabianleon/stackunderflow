import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { DialogoTareaEjecucionComponent } from '../dialogo-tarea-ejecucion/dialogo-tarea-ejecucion.component';
import { EjecucionService } from '../../../servicios/ejecuccion/ejecucion.service';

@Component({
  selector: 'app-dialogo-tarea-ejecucion-button',
  templateUrl: './dialogo-tarea-ejecucion-button.component.html',
  styleUrls: ['./dialogo-tarea-ejecucion-button.component.css']
})
export class DialogoTareaEjecucionButtonComponent implements OnInit {

  constructor(public dialog:MatDialog) {  }

  @Input('tarea') tarea: any[];

  ngOnInit() {
  }

  openDialog(): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(DialogoTareaEjecucionComponent, {
      width: '60%',
      data: this.tarea
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
