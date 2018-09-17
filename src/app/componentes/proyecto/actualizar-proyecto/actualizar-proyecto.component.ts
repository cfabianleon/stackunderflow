import { Component, OnInit, Inject, Input } from '@angular/core';
import { ApiProyectoService } from '../../../servicios/api-proyecto.service';
import { estructura } from '../../../interfaces/proyecto.interface'
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
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.css']
})
export class ActualizarProyectoComponent implements OnInit {
  @Input('proyecto') proyecto: any[]


  fb: FormBuilder;
  proyectoForm: FormGroup;

  listaClientes: clienteEst[];

  misRecursos: Recurso[] = []
  selectedOption: any


  constructor(@Inject(MAT_DIALOG_DATA) public data: estructura, public rol: RolguardService, public dialog: MatDialog, public dialogRef: MatDialogRef<ActualizarProyectoComponent>, private api: ApiProyectoService, fb: FormBuilder, private toastr: ToastrService) {

    this.selectedOption = rol.idConsultor()

    api.obtenerTodosClientes().subscribe((datos) => {
      this.listaClientes = datos.data;
    });

    this.proyectoForm = fb.group({
      idControl: ['', Validators.required],
      nombreControl: ['', Validators.required],
      recursoControl: ['', Validators.required]
    })


  }

  obtenerDatos() {
    this.api.obtenerProyectos().subscribe((datos) => {
      this.api.dataSource = datos.data;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarDatos(id, nombre, recurso) {
    console.log("Entro en el enviar datos de actualizar")

    let ejemplo = {

      id_proyecto: id.value,
      nombre: nombre.value,
      id_gerente: recurso.value

    }

    this.api.actualizarProyecto(ejemplo).subscribe((res) => {

      this.api.cambiarRolGerente(ejemplo).subscribe(res => {
        console.log("es gerente ahora")
      })

      this.api.cantidadDeProyectos(this.rol.idConsultor()).subscribe((res: any) => {
        if (parseInt(res.data[0][1]) == 0) {
          this.api.cambiarRolConsultor({
            id_gerente: this.rol.idConsultor()
          }).subscribe(res => {
            console.log("se Cambio el rol")
          })
        }
      })

      this.toastr.success(' El proyecto con el ha sido actualizado ', 'Mensaje');
    }, error => {
      console.log(error)
      this.toastr.error(' No se pudo Actualizar el proyecto ', 'Mensaje');
    })

    this.dialogRef.close();
    return false;
  }

  rellenarCampos() {
    console.log('Entrooooooooooo')
    console.log(this.data.idp)
    console.log(this.data.nombre)
    console.log(this.data.idc)


    this.proyectoForm.controls['idControl'].setValue(this.data.idp)
    this.proyectoForm.controls['nombreControl'].setValue(this.data.idc)

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
    this.rellenarCampos()
    this.verMisRecursos()
  }

}
