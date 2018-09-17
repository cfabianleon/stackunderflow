import { Component, OnInit,Inject } from '@angular/core';
import { LineaService } from '../../../servicios/linea.service';
import { ApiProyectoService } from '../../../servicios/api-proyecto.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup,Validators} from '../../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-lineas-post-dialog',
  templateUrl: './lineas-post-dialog.component.html',
  styleUrls: ['./lineas-post-dialog.component.css']
})
export class LineasPostDialogComponent implements OnInit {




  crearLineaForm: FormGroup
  listaProyectos : any[];

  constructor(private toastr: ToastrService,public dialogRef: MatDialogRef<LineasPostDialogComponent> ,private api2: ApiProyectoService,private api:LineaService, public dialog: MatDialog,fb:FormBuilder ) { 
    this.crearLineaForm = fb.group({
      nombre_linea: ["",Validators.required,"",Validators.nullValidator],
      costo_linea: ["",Validators.required,"",Validators.nullValidator],
      wi: ["",Validators.required,"",Validators.nullValidator]
          })


    api2.obtenerProyectos().subscribe((datos)=>{
      this.listaProyectos = datos.data;
    })
  }
    
          
  ngOnInit() {
  }


  enviarDatosCrear (nombre,costo,wi){
      
    let estructura ={
    nombre: nombre.value,
    vh: costo.value,
    idp:wi.value.ID_PROYECTO
  
    }

    // alert(JSON.stringify(estructura))
    this.api.crearLinea(estructura).subscribe((algo)=>{
      this.toastr.success('Se ha creado la línea con nombre : '+nombre.value+' y costo '+estructura.vh, 'Mensaje');
      // alert(JSON.stringify(algo))
    });
    this.dialogRef.close();
    return false;
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
