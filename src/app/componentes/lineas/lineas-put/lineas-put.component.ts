import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '../../../../../node_modules/@angular/forms';
import { MatDialogRef, MatSort, MatPaginator} from '../../../../../node_modules/@angular/material';
import { LineaService} from '../../../servicios/linea.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject, ViewChild} from '@angular/core';
import { RolguardService } from '../../../servicios/rolguard.service'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-lineas-put',
  templateUrl: './lineas-put.component.html',
  styleUrls: ['./lineas-put.component.css']
})


export class LineasPutComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  lineaForm
  inputLinea

  message: string = "Hola Mundo!"

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private dialogRef: MatDialogRef<LineasPutComponent>, fb: FormBuilder, private api: LineaService,
    @Inject(MAT_DIALOG_DATA) public data: any, public seguridad: RolguardService, private toastr: ToastrService) { 
      this.lineaForm = fb.group({
        nombre: ["", Validators.required],
        vh : ["",Validators.required]
      })

    }

  ngOnInit() {
    this.rellenarCampos();
  }
  save(){
    this.inputLinea = this.lineaForm.value
    console.log(this.inputLinea)
    let body = {
      ids: this.data.ID_LINEA_SERVICIO,
      nombre: this.inputLinea.nombre,
      vh: this.inputLinea.vh
    }
    console.log("Datos enviados")
    console.log(body)
    
    this.api.actualizarLinea(body).subscribe((datos)=>{
      this.toastr.success('Se ha actualizado la línea con el nombre: '+body.nombre+' y el costo $'+body.vh,'mensaje')
      this.message = "actualizado"
      this.messageEvent.emit(this.message)
    })
    this.dialogRef.close(()=>{
      // this.obtenerDatos();
      this.message = "finalizado"
      this.messageEvent.emit(this.message)
    });

  }

  obtenerDatos(){
    this.api.obtenerLineas().subscribe((datos)=>{
      this.api.dataSource = datos.data;
      this.api.dataSource.sort = this.sort;
      this.api.dataSource.paginator = this.paginator;
    })
  }

  rellenarCampos(){
    this.lineaForm.controls['nombre'].setValue(this.data.NOMBRE_LINEA)
    this.lineaForm.controls['vh'].setValue(this.data.VALOR_HORA)
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
