import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estructura } from '../interfaces/proyecto.interface';
import {MatTableDataSource, MatPaginator, MatSort, MatTab} from '@angular/material';
import { RolguardService } from './rolguard.service';

@Injectable({
  providedIn: 'root'
})


export class ApiProyectoService {

    httpOptions = {
    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
     'Authorization': localStorage.getItem('usuario')
    })
   };


  url = 'https://getionibm.mybluemix.net/';
  //url = 'https://getionibm.mybluemix.net/';


  constructor(public http:HttpClient, public rolGuard: RolguardService) { }

  dataSource : MatTableDataSource<any>;


  obtenerProyectos():Observable<any>{
    return this.http.get(this.url+'proyecto', this.httpOptions);
  }

  obtenerProyectosMios():Observable<any>{
    return this.http.get(this.url+'proyecto/gerente/'+ this.rolGuard.idConsultor(), this.httpOptions);
  }

  crearProyecto(body):Observable<any>{
    return this.http.post(this.url+'proyecto/crear', body, this.httpOptions);
  }
  
  obtenerClientes(id):Observable<any>{
    return this.http.get(this.url+'cliente/'+id,this.httpOptions);
  }

  obtenerTodosClientes():Observable<any>{
    return this.http.get(this.url+'cliente/',this.httpOptions);
  }

  actualizarProyecto(body):Observable<any>{
    console.log(body)
    return this.http.put(this.url+'proyecto/actualizar', body, this.httpOptions);
  }

  crearLinea(body):Observable<any>{
    console.log("Ingreso a crear una línea")
    console.log(body)
    return this.http.post(this.url+'lineaservicio/crear/',body,this.httpOptions);
  }
  obtenerAplicaciones(id: number): Observable<any> {
    return this.http.get(this.url + 'proyecto/aplicaciones/' + id, this.httpOptions);
  }

  obtenerTareas (id: number): Observable<any> {
    return this.http.get(this.url + 'atencion/tareas/' + id, this.httpOptions);
  }

  obtenerLineas(id):Observable<any>{
    console.log("Ingreso a obtener líneas")
    console.log(id)
    return this.http.get(this.url+`proyecto/lservicio/${id}/`,this.httpOptions)
  }


  obtenerTodasLineas(): Observable<any> {
    return this.http.get(this.url + 'lineaservicio/',this.httpOptions );
  }

  misRecursos(id) {
    return this.http.get(this.url + `proyecto/misrecursos/${id}`, this.httpOptions);
  }

  cambiarRolGerente(body) {
    return this.http.put(this.url + `proyecto/actualizarRolGerente`, body, this.httpOptions);
  }
  cambiarRolConsultor(body) {
    return this.http.put(this.url + `proyecto/actualizarRolConsultor`, body, this.httpOptions);
  }

  cantidadDeProyectos(id) {
    return this.http.get(this.url + `proyecto/contar/${id}`, this.httpOptions);
  }
}
