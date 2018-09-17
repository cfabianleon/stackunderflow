import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { DialogoPostComponent } from '../dialogo-post/dialogo-post.component';

@Component({
  selector: 'app-dialogo-post-recurso',
  templateUrl: './dialogo-post-recurso.component.html',
  styleUrls: ['./dialogo-post-recurso.component.css']
})
export class DialogoPostRecursoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoPostComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

}
