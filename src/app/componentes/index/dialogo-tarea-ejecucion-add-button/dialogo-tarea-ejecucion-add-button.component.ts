import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { DialogoAddEjecucionComponent } from '../dialogo-add-ejecucion/dialogo-add-ejecucion.component';

@Component({
  selector: 'app-dialogo-tarea-ejecucion-add-button',
  templateUrl: './dialogo-tarea-ejecucion-add-button.component.html',
  styleUrls: ['./dialogo-tarea-ejecucion-add-button.component.css']
})
export class DialogoTareaEjecucionAddButtonComponent implements OnInit {

  constructor(public dialog:MatDialog) {  }
  
  @Input('tarea') tarea: any[];

  ngOnInit() {
  }

  openDialog(): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(DialogoAddEjecucionComponent, {
      width: '40%',
      data: this.tarea
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
