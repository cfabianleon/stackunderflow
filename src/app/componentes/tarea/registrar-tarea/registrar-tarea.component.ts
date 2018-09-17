import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { tareaEst } from '../../../interfaces/tareas.interface';
import { consEstc } from '../../../interfaces/consultores.Activ.interface';
import { FormControl, Validators, FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms'
import { MatDialogRef } from '../../../../../node_modules/@angular/material'
import * as moment from 'moment';
import { DialogoRegistrarTareaComponent } from '../dialogo-registrar-tarea/dialogo-registrar-tarea.component';
import { RolguardService } from '../../../servicios/rolguard.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.css']
})
export class RegistrarTareaComponent implements OnInit {

  consultores: any;
  requerimientos: any;
  
  tareaForm: FormGroup
  rol: string;
  idco: number;
  nombre: string;
  selectedValue: any;
  listaProyectos: any;
  estadoAtencion: any;
  constructor(private toastr: ToastrService,private api: ApiService, private dialogRef:MatDialogRef<DialogoRegistrarTareaComponent>,
    public cCQ:RolguardService, fb: FormBuilder  ) { 
    this.tareaForm = fb.group({
      idConsultor : ['', Validators.required],
      idAtencion : ['', Validators.required],
      proyectoN : ['', Validators.required],
      horasEst : ['', Validators.required],
      desc : ['', Validators.required],
      fechaEsp : ['', Validators.required]
    })
    this.selectedValue = this.cCQ.idNombre().id;
  }

  ngOnInit() {
    this.rol = this.cCQ.idNombre().rol.toUpperCase();
    this.idco = this.cCQ.idNombre().id;
    this.nombre = this.cCQ.idNombre().nombre;

    this.api.obtenerConsultores().subscribe((datos) => {
      this.consultores = datos.data;
    });

    this.api.obtenerProyectos().subscribe((datos) => {
      this.listaProyectos = datos.data;
    });

  }

  obtenerRequerimientosPorProyecto(id:any):void {
    
    
    this.api.obtenerRequerimientosPorProyecto(id).subscribe((datos)=>{
      this.requerimientos = datos.data;
;    })
  }

  registrarTarea(consultor, requerimiento, horasEstimadas, Descripcion, FechaEsperada) {
    // var moment = require('moment');
    this.api.consultarAtencion(requerimiento.value).subscribe((datos: any)=>{
    this.estadoAtencion = datos.data[0].ESTADO; 
    console.log("estado")
    console.log(this.estadoAtencion)  

    if(this.estadoAtencion!=='Finalizada'){
      var convertedDate = moment(FechaEsperada.value, "DD/MM/YYYY").format("YYYY-MM-DD-00.00.00.000000");
      let jsonconv : tareaEst = {
        id_consultor_tarea : consultor.value,
        id_atencion_tarea : requerimiento.value,
        hora_estimada : horasEstimadas.value,
        desc_tarea : Descripcion.value,
        fecha_fin_planeada :convertedDate.toString()
      };

      let jsonconv2 : consEstc = {
        ids : consultor.value
      };

      this.api.postTareas(jsonconv).subscribe((datos) => {
        this.toastr.success('tarea creada con exito! ', 'Mensaje');
      })

    

      this.api.activarConsultor(jsonconv2).subscribe((datos) => {
      });
   }
   else{
     this.toastr.error('no se puede registrar Tareas en requerimientos finalizados', 'Error');}
    this.dialogRef.close()
    });
  }

  close(){
    this.dialogRef.close()
  }
}
