import { Component, OnInit } from '@angular/core';
import { EjecucionService } from '../../servicios/ejecuccion/ejecucion.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.css']
})
export class EjecucionComponent implements OnInit {
  ejecuciones: any;
  ejecuciones2: any;
  num_horas: number;
  obs_ejecucion: string;
  id_tarea: number;
  id_ejecucion: number;

  constructor(private ejecucionService: EjecucionService) {
  }

  ngOnInit() {
  }

  onGet() {
    this.ejecucionService.getEjecucion()
      .subscribe(
        ((data) => {
          console.log(data);
          this.ejecuciones = data;
        })
      );
  }
  onPost() {
    this.ejecucionService.postEjecuccion(this.num_horas, this.obs_ejecucion, this.id_tarea)
      .subscribe(
        ((data) => {
          console.log(data);
          this.ejecuciones = data;
        })
      );
  }

  onPut() {
    this.ejecucionService.putEjecuccion(this.id_ejecucion, this.obs_ejecucion, this.num_horas)
      .subscribe(
        ((data) => {
          console.log((data));
          this.ejecuciones2 = data;
        })
    );
  }
}
