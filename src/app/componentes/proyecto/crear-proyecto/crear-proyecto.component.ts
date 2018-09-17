import { Component, OnInit, Inject, Input } from '@angular/core';
import { ApiProyectoService } from '../../../servicios/api-proyecto.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { clienteEst } from '../../../interfaces/cliente.interface';
import { ToastrService } from 'ngx-toastr';
import { RolguardService } from '../../../servicios/rolguard.service';

export interface Recurso {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})


export class CrearProyectoComponent implements OnInit {


  fb: FormBuilder;
  proyectoForm: FormGroup;

  listaClientes: clienteEst[];
  misRecursos: Recurso[] = []
  selectedOption: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public rol: RolguardService, public dialog: MatDialog, public dialogRef: MatDialogRef<CrearProyectoComponent>, private api: ApiProyectoService, fb: FormBuilder, private toastr: ToastrService) {

    this.selectedOption = rol.idConsultor();
    api.obtenerTodosClientes().subscribe((datos) => {
      this.listaClientes = datos.data;
    });

    this.proyectoForm = fb.group({
      idControl: ['', Validators.required],
      nombreControl: ['', [Validators.required]],
      clienteControl: ['', [Validators.required]],
      lineaControl: ['', [Validators.required]],
      costoControl: ['', [Validators.required]],
      recursoControl: ['', Validators.required]
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarDatos(id, nombre, seleccion, nombreLinea, costoHora, recurso) {

    let datosProyecto = {
      id_proyecto: id.value,
      id_cliente: seleccion.value.ID_CLIENTE,
      nombre: nombre.value,
      id_gerente: recurso.value
    }

    let datosLinea = {
      nombre: nombreLinea.value,
      vh: costoHora.value,
      idp: id.value
    }

    this.api.crearProyecto(datosProyecto).subscribe((respuesta) => {
      
      this.api.cambiarRolGerente(datosProyecto).subscribe(res => {
        console.log("se Cambio el rol")
      })
      this.toastr.success(' El proyecto con el nombre: ' + nombre.value + ' ha sido creado ', 'Mensaje');
      this.api.crearLinea(datosLinea).subscribe((res) => {
        this.toastr.success(' la linea ' + nombreLinea.value + ' ha sido cread@ ', 'Mensaje');
      })
    });

    this.dialogRef.close();
    return false;
  }

  verMisRecursos() {
    this.api.misRecursos(this.rol.idConsultor()).subscribe((datos: any) => {
      datos.data.forEach(element => {
        let ele = {
          value: element.ID_CONSULTOR,
          viewValue: element.NOMBRE_CONSULTOR
        }
        this.misRecursos.push(ele)
      });
    })
  }

  ngOnInit() {
    this.verMisRecursos()
  }

}
