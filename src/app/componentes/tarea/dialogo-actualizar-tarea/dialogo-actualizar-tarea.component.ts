import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material'
import { FinalizarTareaComponent } from '../finalizar-tarea/finalizar-tarea.component';
import { ActualizarTareaComponent } from '../actualizar-tarea/actualizar-tarea.component';
import { ApiService } from '../../../servicios/api.service';
import { tareaFin } from '../../../interfaces/tareasFin.interface';
import { reqFin } from '../../../interfaces/reqFin.interface';
import { tareaStop } from '../../../interfaces/stopperTarea.interface';
import { ReportesService } from '../../../servicios/reportes.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-dialogo-actualizar-tarea',
  templateUrl: './dialogo-actualizar-tarea.component.html',
  styleUrls: ['./dialogo-actualizar-tarea.component.css']
})
export class DialogoActualizarTareaComponent implements OnInit {

  constructor(private api:ApiService, public dialog: MatDialog, private toastr: ToastrService) { }

  @Input('tarea') tarea: any;
  tareaFin: tareaFin
  tareaEst: any;
  idAtencion: any;
  lengthTareasFin: any;
  lengthTareas: any;

  @Output() messageEvent = new EventEmitter<string>();

  message: string = "cerro dialogo"


  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  ngOnInit() {
    //console.log(this.tarea);
    this.tareaEst = this.tarea.ESTADO
    console.log(this.tareaEst);
  }
  
  openDialog(): void {
    //console.log(this.consultor)
    const dialogRef = this.dialog.open(ActualizarTareaComponent, {
      width: '40%',
      data: this.tarea
    });

    dialogRef.afterClosed().subscribe(result => {
      this.messageEvent.emit(this.message);

    });
  }

  
  finalizarTarea(){
    this.tareaFin = this.tarea.ID_TAREA
     let jsonconv : tareaFin = {
     id_tarea : this.tarea.ID_TAREA
    }
    let jsonconv2 : reqFin = {
      id : this.tarea.ID_ATENCION_TAREA,
      estado : "Finalizada"
      }
    this.lengthTareas = 0;
    this.lengthTareasFin = 0;
    this.tareaEst = this.tarea.ESTADO;
    this.idAtencion = this.tarea.ID_ATENCION_TAREA;
    if(this.tareaEst!='Finalizada'){
      this.api.finTareas(jsonconv).subscribe((datos)=>{
        this.api.finTareas2(jsonconv).subscribe((datos)=>{
          this.api.getTareasFinalizadas(this.idAtencion).subscribe((datos: any)=>{
            this.lengthTareasFin = datos.data.length; 
              this.api.getTareasEjecucion(this.idAtencion).subscribe((datos2: any)=>{
                this.lengthTareas = datos2.data.length;
                if (this.lengthTareas == this.lengthTareasFin && this.lengthTareas!=0){
                  this.api.setEstado(jsonconv2).subscribe((datos3)=>{
                    this.toastr.success('Requerimiento Finalizado con exito! ', 'Mensaje');
                    this.messageEvent.emit(this.message);
                  });
                }
              });
          });
          this.toastr.success('Tarea finalizada con exito! ', 'Mensaje');
          this.messageEvent.emit(this.message);

        });
      });      
    }else{
      this.toastr.error('No se puede finalizar esta tarea pues ya esta finalizada ', 'Error');
      this.messageEvent.emit(this.message);

    }
  }

  stopperTarea(){

    // let jsonconv : tareaFin = {
    //   id_tarea : this.tarea.values.ID_TAREA
    // }

    this.tareaFin = this.tarea.ID_TAREA
    this.idAtencion = this.tarea.ID_ATENCION_TAREA
    //console.log(jsonconv)
    this.tareaEst = this.tarea.ESTADO
    if(this.tareaEst!='Stopper'){
      if(this.tareaEst=='En ejecucion'){
        let jsonconv : tareaStop = {
          id_tarea : this.tarea.ID_TAREA,
          estado : 'Stopper'
          }
        this.api.stopperTareas(jsonconv).subscribe((datos)=>{
          this.toastr.success('La tarea fue detenida con exito! ', 'Mensaje');
          this.messageEvent.emit(this.message);

        });
      }
      else{
        if(this.tareaEst=='En planeacion'){
          let jsonconv : tareaStop = {
            id_tarea : this.tarea.ID_TAREA,
            estado : 'En ejecucion'
            }
          this.api.stopperTareas(jsonconv).subscribe((datos)=>{
            this.toastr.success('La tarea fue iniciada con exito! ', 'Mensaje');
          });
        }
        else{
        this.toastr.error('No se puede detener una tarea ya Finalizada', 'Error');
        this.messageEvent.emit(this.message);

        }
      }
    }else{
      let jsonconv : tareaStop = {
        id_tarea : this.tarea.ID_TAREA,
        estado : 'En ejecucion'
        }
      this.api.stopperTareas(jsonconv).subscribe((datos)=>{
        this.toastr.success('La tarea fue inicida con exito! ', 'Mensaje');
        this.messageEvent.emit(this.message);

        });
      
    }
  }
}
