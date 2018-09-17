import { Component, OnInit } from '@angular/core';
import { AtencionService} from '../../servicios/atencion.service';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  atencion:any
  proyectos:any
  
  constructor(private api:AtencionService) { }

  ngOnInit() {
    this.api.obtenerProyectos().subscribe((datos)=>{
      this.proyectos = datos.data;
      console.log(this.proyectos);
    })

   

  }
}
