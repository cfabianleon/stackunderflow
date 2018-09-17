import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '../../../../../node_modules/@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ActualizarRequerimientosComponent } from '../actualizar-requerimientos/actualizar-requerimientos.component';
import { AtencionService } from '../../../servicios/atencion.service';
import { reqFin } from '../../../interfaces/reqFin.interface';
import { DialogoDescripcionComponent } from '../dialogo-descripcion/dialogo-descripcion.component';
import { FileManagerService } from '../../../servicios/file-manager.service';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-dialogo-actualizar',
  templateUrl: './dialogo-actualizar.component.html',
  styleUrls: ['./dialogo-actualizar.component.css']
})

export class DialogoActualizarComponent implements OnInit {
  @Input()data: any
  idAtencion: any
  estadoAtencion: any
  fileUrl: String
  constructor(public dialog: MatDialog, private api:AtencionService, private toastr: ToastrService, private api2:FileManagerService) { }

  // @Input('requerimiento') requerimiento: any[];

  openDialogActualizar(): void {
    const dialogRef = this.dialog.open (ActualizarRequerimientosComponent, {
      width: '50%',
      data: this.data
    } )
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  changeState(): void{
    this.idAtencion = this.data.ID_ATENCION
    this.estadoAtencion = 'En ejecucion'
    var estado;
    this.api.obtenerRequerimiento(this.idAtencion).subscribe((datos:any)=>{
      estado = datos.data[0].ESTADO;
      if(estado === this.estadoAtencion){
        this.toastr.error('No se puede reiniciar una ejecucion ya iniciada. ', 'Error');
      }else{
        let jsonconv2 : reqFin = {
          id : this.idAtencion,
          estado : this.estadoAtencion
          }
        this.api.setEstado(jsonconv2).subscribe((datos)=>{
          this.toastr.success('Ejecucion reiniciada con exito! ', 'Mensaje');
        });
      }
    });

  }  

  verDescripcion() {
    const dialogRef = this.dialog.open(DialogoDescripcionComponent, {
      width: '40%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  hayUrl() {
    if(this.data.URL && this.data.URL != "undefined") {
      return true
    }
    else {
      return false
    }
  }

  download() {
    console.log(this.fileUrl)
    this.api2.downloadFile(this.fileUrl)
    .subscribe(
      data => saveAs(data, this.fileUrl),
      error => console.log(error)
    )
  }

  ngOnInit() {
    console.log(this.data.URL)
    this.hayUrl()
    this.fileUrl = this.data.URL
  }
}