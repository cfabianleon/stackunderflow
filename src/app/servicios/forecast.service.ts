import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ForecastService {

  constructor(public http:HttpClient) { }
    url = 'https://getionibm.mybluemix.net/';
    //url = 'https://getionibm.mybluemix.net/';

  obtenerForecast():Observable<any>{
    return this.http.get(this.url+'forecast')
  }
  
  obtenerContratos():Observable<any>{
    return this.http.get(this.url+'forecast/contratos')
  }

  guardarForecast(body):Observable<any>{
    return this.http.post(this.url+'forecast/crear',body)
  }

  actualizarForecast(body):Observable<any>{
    return this.http.post(this.url+'forecast/actualizar',body)
  }

  buscarConsultores(body):Observable<any>{
    return this.http.post(this.url+'forecast/buscar',body)
  }

  buscarProyectos(body):Observable<any>{
    return this.http.post(this.url+'forecast/proyectos',body)
  }

  distintosForecast():Observable<any>{
    return this.http.get(`${this.url}forecast/distintos`)
  }
 


}
