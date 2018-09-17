import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../servicios/forecast.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  wi_proyectos
  contratos;

  constructor( private fs:ForecastService ) {
    fs.distintosForecast().subscribe( data =>{
      this.wi_proyectos = data.wi_proyecto;
      this.contratos = data.contrato;
    })
  }

  ngOnInit() {
  }

}
