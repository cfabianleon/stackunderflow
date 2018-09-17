import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { DialogoPutComponent } from '../dialogo-put/dialogo-put.component';

@Component({
  selector: 'app-dialogo-put-recurso',
  templateUrl: './dialogo-put-recurso.component.html',
  styleUrls: ['./dialogo-put-recurso.component.css']
})
export class DialogoPutRecursoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input('consultor') consultor: any[];

  ngOnInit() {
    //console.log(this.consultor)
  }

  openDialog(): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(DialogoPutComponent, {
      width: '40%',
      data: this.consultor
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
