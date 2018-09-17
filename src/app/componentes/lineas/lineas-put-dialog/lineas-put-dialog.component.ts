import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { LineasPutComponent } from '../lineas-put/lineas-put.component';

@Component({
  selector: 'app-lineas-put-dialog',
  templateUrl: './lineas-put-dialog.component.html',
  styleUrls: ['./lineas-put-dialog.component.css']
})
export class LineasPutDialogComponent implements OnInit {

  constructor(public dialog:MatDialog) { }
  @Input('linea') linea: any[];
  @Output() messageEvent = new EventEmitter<string>();

  message: string = "cerro dialogo"


  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  openDialog(): void{
    console.log(this.linea)
    const dialogRef = this.dialog.open(LineasPutComponent, {
      width: '40%',
      data: this.linea
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.messageEvent.emit(this.message)

    });
  }


  ngOnInit() {
  }

}
