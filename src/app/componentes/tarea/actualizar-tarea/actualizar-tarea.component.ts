import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { tareaAct } from '../../../interfaces/tareasAct.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material'
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { DialogoActualizarTareaComponent } from '../dialogo-actualizar-tarea/dialogo-actualizar-tarea.component';
import { MatDialog } from '../../../../../node_modules/@angular/material'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.css']
})
export class ActualizarTareaComponent implements OnInit {

  tareas: any;
/*
  id_tarea = new FormControl('',[Validators.nullValidator]);
  desc_tarea = new FormControl('',[Validators.nullValidator]);
*/
  tareaForm: FormGroup
  tareaAct: tareaAct

  constructor( private api:ApiService, private dialogRef:MatDialogRef<DialogoActualizarTareaComponent>,fb:FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService ) {
    this.tareaForm = fb.group({
      id_tarea: data.ID_TAREA,
      desc_tarea: ["",Validators.required]
    })
   }

  rellenarCampos(){
    this.tareaForm.controls['desc_tarea'].setValue(this.data.DESC_TAREA)
  }

  ngOnInit() {
    this.rellenarCampos();
    this.api.obtenerTareas().subscribe((datos)=>{
      this.tareas = datos.data;
    })
  }

  actualizarDescripcion(){
    this.tareaAct = this.tareaForm.value;
    this.api.putTareas(this.tareaAct).subscribe((result)=>{
      this.toastr.success('Tarea actualizada con exito! ', 'Mensaje');
    });
    this.dialogRef.close()
  }
  
  close(){
    this.tareaAct = this.tareaForm.value;
    this.dialogRef.close()
  }

}
