import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjecucionService {
  private url = 'http://gestionibm.mybluemix.net/';

  
  httpOptions = {

    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
      'Authorization': localStorage.getItem('usuario')
   })
  }
  constructor(public http: HttpClient) {
  }

  obtenerEjecuciones(id_tarea: number) :Observable<any> {
    return this.http.get(this.url+"tarea/ejecuciones/"+id_tarea,this.httpOptions)
    // return this.http.get(this.heroesUrl, requestOptions)
  }
  getEjecucion(): Observable<any> {

    return this.http.get(this.url + 'ejecucion', this.httpOptions);
  }

  getejeuccion(id: number): Observable<any> {
    return this.http.get(this.url + 'ejecucion/' + id);
  }
  postEjecuccion(num_horas: number, obs_ejecucion: string, id_tarea: number): Observable<any> {

    return this.http.post(this.url + 'ejecucion/crear',

      {

      'num_horas': num_horas,

      'obs_ejecucion': obs_ejecucion,

      'id_tarea_ejecucion': id_tarea

    },this.httpOptions);

  }
   putEjecuccion(id: number, obs_ejecucion: string, num_horas: number ): Observable<any> {
     return this.http.put(this.url + 'ejecucion/actualizar', {
       'id': id,
       'obs_ejecucion': obs_ejecucion,
       'num_horas': num_horas
     },this.httpOptions);
   }
}
