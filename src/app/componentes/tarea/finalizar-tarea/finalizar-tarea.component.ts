import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { tareaFin } from '../../../interfaces/tareasFin.interface';
import { MatDialogRef } from '../../../../../node_modules/@angular/material'
import { FormControl, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { DialogoActualizarTareaComponent } from '../dialogo-actualizar-tarea/dialogo-actualizar-tarea.component';

@Component({
  selector: 'app-finalizar-tarea',
  templateUrl: './finalizar-tarea.component.html',
  styleUrls: ['./finalizar-tarea.component.css']
})
export class FinalizarTareaComponent implements OnInit {

  tareas: any;
  id_tarea = new FormControl('',[Validators.nullValidator]);

  constructor( private api:ApiService, private dialogRef:MatDialogRef<DialogoActualizarTareaComponent> ) { }

  ngOnInit() {
    this.api.obtenerTareas().subscribe((datos)=>{
      this.tareas = datos.data;
    })
  }

  finalizarTarea(idTarea){
    alert(idTarea.value);
    let jsonconv : tareaFin = {
      id_tarea : idTarea.value
    }
  
    this.api.finTareas(jsonconv).subscribe((datos)=>{
      console.log(JSON.stringify(datos))
    });

    this.dialogRef.close()
  }

  close(){
    this.dialogRef.close()
  }
}
