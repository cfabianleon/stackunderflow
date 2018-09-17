import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { tareaEst } from '../interfaces/tareas.interface';
import { tareaAct } from '../interfaces/tareasAct.interface';
import { tareaFin } from '../interfaces/tareasFin.interface';
import { clienteEst } from '../interfaces/cliente.interface';
import { consEstc } from '../interfaces/consultores.Activ.interface';
import { clienteAc } from '../interfaces/clienteAc.interface';
import { reqFin } from '../interfaces/reqFin.interface';
import { tareaStop } from '../interfaces/stopperTarea.interface';
import { MatTableDataSource } from '@angular/material';
import { RolguardService } from './rolguard.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  httpOptions = {


  headers: new HttpHeaders({
    //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
    'Authorization': localStorage.getItem('usuario')
 })
}
dataSource : MatTableDataSource<any>;
private _url2: string= "https://getionibm.mybluemix.net/";
 //private _url2: string= "https://getionibm.mybluemix.net/";

 constructor( public http:HttpClient, public rol:RolguardService ) { }

  //clientes
  obtenerClientes(): Observable<any> {
    return this.http.get(this._url2 + "cliente", this.httpOptions)
    // return this.http.get(this.heroesUrl, requestOptions)
  }

  crearClientes(body: clienteEst): Observable<any> {
    // return this.http.get(this._urlc,this.httpOptions)
    console.log(body)
    return this.http.post(this._url2 + "cliente/crear", body, this.httpOptions)
    // return this.http.get(this.heroesUrl, requestOptions)
  }

  actualizarClientes(body: clienteAc) {
    console.log(body)
    return this.http.put(this._url2 + "cliente/actualizar", body, this.httpOptions)
  }

  //Consultores
  obtenerConsultores(): Observable<any> {
    return this.http.get(this._url2 + "consultor", this.httpOptions)
  }

 //Tareas
 obtenerTareas() :Observable<any> {
  return this.http.get(this._url2+"tarea/"+this.rol.idConsultor(),this.httpOptions)
 }

  //Proyectos
  // Registrar Tarea
  postTareas(body: tareaEst) {
    return this.http.post(this._url2 + 'tarea/crear', body, this.httpOptions);
  }

  // ActualizarTarea
  putTareas(body: tareaAct) {
    return this.http.put(this._url2 + 'tarea/actualizar2', body, this.httpOptions);
  }

  // FinalizarTarea
  finTareas(body: tareaFin) {
    // console.log(body)
    return this.http.put(this._url2 + 'tarea/finalizar', body, this.httpOptions);
  }

  // FinalizarTarea
  finTareas2(body: tareaFin) {
    // console.log(body)
    return this.http.put(this._url2 + 'tarea/finalizar2', body, this.httpOptions);
  }

  // FinalizarTarea
  stopperTareas(body: tareaStop) {
    // console.log(body)
    return this.http.put(this._url2 + 'tarea/stopper', body, this.httpOptions);
  }

  // ActualizarTarea
  activarConsultor(body: consEstc) {
    return this.http.put(this._url2 + 'consultor/activar', body, this.httpOptions);
  }

  //obtenerRequerimientos
  obtenerRequerimientos(): Observable<any> {
    return this.http.get(this._url2 + "atencion", this.httpOptions)
  }

  //obtenerRequerimientos
  obtenerRequerimientosPorProyecto(id: any): Observable<any> {
    return this.http.get(this._url2 + "proyecto/requerimientos/" + id, this.httpOptions);
  }

  obtenerProyectos(): Observable<any> {
    return this.http.get(this._url2 + "proyecto", this.httpOptions)
  }

  getTareasFinalizadas(id) {
    return this.http.get(this._url2 + `query/finalizadas/${id}`, this.httpOptions);
  }

  getTareasEjecucion(id) {
    return this.http.get(this._url2 + `query/tareas/${id}`, this.httpOptions);
  }


  setEstado(body: reqFin) {
    return this.http.put(this._url2 + 'atencion/setEstado', body, this.httpOptions);
  }

  consultarAtencion(id) {
    return this.http.get(this._url2 + `atencion/${id}`, this.httpOptions);
  }

  

}