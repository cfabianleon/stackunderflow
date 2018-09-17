import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { aplicacion} from '../interfaces/aplicacion.interface'
import { RolguardService } from './rolguard.service'

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  dataSource;
  httpOptions = {

    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllb…E1MH0.QzPysFb987sPPOTS4bR2V8qH181L5yTThHeMkKnhJ5M'
      'Authorization': localStorage.getItem('usuario')
   })
  
  }
  private _url: string= "https://getionibm.mybluemix.net/";
  //private _url: string= "https://getionibm.mybluemix.net/";

  constructor( private http:HttpClient, private rol:RolguardService ) { }

  obtenerProyectos() :Observable<any> {
    return this.http.get(this._url+"proyecto/", this.httpOptions)
   }
  
   obtenerLineasProyecto(id:any):Observable<any>{
     return this.http.get(this._url+"proyecto/lservicio/"+id, this.httpOptions);
   }
   
  obtenerAplicaciones(): Observable<any>{
    let id = this.rol.idConsultor()
    return this.http.get( `${this._url}aplicacion/${id}`, this.httpOptions )
  }
  obtenerUnaAplicaciones( id:number ): Observable<any>{
    return this.http.get( `${this._url}aplicacion/${ id }`, this.httpOptions )
  }
  crearAplicacion( aplicacion:aplicacion ){
    return this.http.post( `${ this._url }aplicacion/crear`, aplicacion , this.httpOptions )
  }
  actualizarAplicacion( aplicacion:aplicacion){
    console.log(aplicacion)
    return this.http.put( `${this._url}aplicacion/actualizar`, aplicacion, this.httpOptions )
  }


}
