import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { atencion } from '../interfaces/atencion.interface';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  
  httpOptions = {

    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('usuario')
   })
  }

  private _url: string= "https://getionibm.mybluemix.net/";
  //private _url: string= "https://getionibm.mybluemix.net/";


  constructor( public http:HttpClient ) { }

  obtenerArchivos() :Observable<any> {
    return this.http.get(this._url+"fileManager/")
  }

  uploadFile(file: FormData) :Observable<any> {
    return this.http.post(this._url+"fileManager/upload",file, {
      reportProgress: true,
      observe: 'events'
    })
  }

  downloadFile(file: String) :Observable<any> {
    var body = {filename: file}
    return this.http.post(this._url+"fileManager/download", body, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  obtenerProyectos(id: number) :Observable<any> {
    return this.http.get(this._url+"proyecto/cliente/"+ id,this.httpOptions )
   }
  
   obtenerLineasProyecto(id:any):Observable<any>{
    return this.http.get(this._url+"proyecto/lservicio/"+id, this.httpOptions);
  }
  obtenerAplicacionesLinea(id2:any):Observable<any>{
    return this.http.get(this._url+"aplicacion/lineaservicio/"+id2,this.httpOptions)
  }

  postRequerimiento(tipo_atencion:string,id_cliente_atencion:string,titulo_atencion:string,descripcion_atencion:string,fecha_esperada:String,fecha_acordada:String,id_aplicacion_atencion:number, url:String
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
}
