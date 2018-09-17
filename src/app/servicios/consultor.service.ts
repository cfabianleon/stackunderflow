import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Consultor } from '../componentes/recursos/tabla-recursos/tabla-recursos.component';
import { RolguardService } from './rolguard.service'

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {

  httpOptions = {

    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllb…E1MH0.QzPysFb987sPPOTS4bR2V8qH181L5yTThHeMkKnhJ5M'
      'Authorization': localStorage.getItem('usuario')
   })
  
  }

  
  private _url: string= "https://getionibm.mybluemix.net/";
  //private _url: string= "https://getionibm.mybluemix.net/";
  
  
   constructor( public http:HttpClient, private rol:RolguardService ) { }
  
   //Consultores
   obtenerConsultores() :Observable<any> {
     return this.http.get(this._url+"consultor/"+this.rol.idConsultor(), this.httpOptions)
   }
  
   crearConsultor(consultor: Consultor) {
     return this.http.post(this._url+"auth/register", consultor, this.httpOptions)
   }
  
   actualizarConsultor(consultor: Consultor) {
     return this.http.post(this._url+"consultor/actualizar", consultor, this.httpOptions)
   }
}
