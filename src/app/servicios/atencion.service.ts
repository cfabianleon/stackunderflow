import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { atencion } from '../interfaces/atencion.interface';
import { reqFin } from '../interfaces/reqFin.interface';
import { RolguardService } from './rolguard.service';


@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  httpOptions = {

    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllb…E1MH0.QzPysFb987sPPOTS4bR2V8qH181L5yTThHeMkKnhJ5M'
      'Authorization': localStorage.getItem('usuario')
   })
  
  }
  private _url: string= "https://getionibm.mybluemix.net/";
  //private _url: string= "https://getionibm.mybluemix.net/";
  
  constructor(public http:HttpClient,public rol:RolguardService) { }

  obtenerProyectos() :Observable<any> {
    return this.http.get(this._url+"proyecto", this.httpOptions)
   }
  
   obtenerLineasProyecto(id:any):Observable<any>{
     return this.http.get(this._url+"proyecto/lservicio/"+id, this.httpOptions);
   }
   obtenerAplicacionesLinea(id2:any):Observable<any>{
     return this.http.get(this._url+"aplicacion/lineaservicio/"+id2,this.httpOptions)
   }
   //lista todos los requerimientos falta filtrar por id de aplicacion
      //lista todos los requerimientos falta filtrar por id de aplicacion

    obtenerRequerimientos() :Observable<any> {

      return this.http.get(this._url+"atencion/"+this.rol.idConsultor(), this.httpOptions)
  
     }

       
  obtenerRequerimiento(id:any) :Observable<any> {

    return this.http.get(this._url+"atencion/"+id, this.httpOptions)

   }

   atencionesxaplicacion(id:any) :Observable<any>{
     return this.http.get(this._url+"aplicacion/atenciones/"+id,this.httpOptions)
   }


   postRequerimiento(tipo_atencion:string,id_cliente_atencion:number,titulo_atencion:string,descripcion_atencion:string,fecha_esperada:String,fecha_acordada:String,id_aplicacion_atencion:number, url:String
    ): Observable<any> {

      let body = {
        'tipo':tipo_atencion,
        'id_cliente':id_cliente_atencion,
        'titulo': titulo_atencion,
        'descripcion':descripcion_atencion,
        'fecha_esperada':fecha_esperada,
        'fecha_acordada':fecha_acordada,
         'id_app':id_aplicacion_atencion,
         'estado': "En planeación",
        'url': url
      }

      console.log("Post Requerimiento")
      console.log(body)
     return this.http.post(this._url + 'atencion/crear',
       body,this.httpOptions);
    }

    actualizarRequerimiento(body:atencion){
      return this.http.put(this._url + 'atencion/actualizar',body,this.httpOptions)
      }
  
   obtenerTareas(id: number): Observable<any> {
    return this.http.get(this._url + '/atencion//tareas/' + id, this.httpOptions);


   }

   setEstado(body:reqFin) {
    return this.http.put(this._url + 'atencion/setEstado',body,this.httpOptions);
  }
}
