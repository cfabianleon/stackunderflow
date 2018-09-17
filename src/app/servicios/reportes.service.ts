import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(public http:HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
      'Authorization': localStorage.getItem('usuario')
    })
   };

 
  url = 'https://getionibm.mybluemix.net/';
  //url = 'https://getionibm.mybluemix.net/';


  getTareasFinalizadas(id){
    console.log("Ingreso a obtener todas las tareas con el id: "+id)
    return this.http.get(this.url+`query/finalizadas/${id}`,this.httpOptions);
  }

  getTareasEjecucion(id){
    console.log("Ingreso a obtener todas las tareas")
    return this.http.get(this.url+`query/ejecucion/${id}`,this.httpOptions);
  }

  getTareasPlaneacion(id){
    console.log("Ingreso a obtener todas las tareas")
    return this.http.get(this.url+`query/planeacion/${id}`,this.httpOptions);
  }

  getTareaStopper(id){
    return this.http.get(this.url+`query/stopper/${id}`,this.httpOptions);
  }

  getTablaCostos(){
    return this.http.get(this.url+`query/`,this.httpOptions);

  }

  getTablaAuditoria(){
    return this.http.get(this.url+`query/auditoria`,this.httpOptions);
  }


}
