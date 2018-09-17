import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CrearComponent } from '../crear/crear.component'
 
@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {

  constructor( public dialog:MatDialog ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  ngOnInit() {
  }

}
