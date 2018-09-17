import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import { clienteEst } from '../interfaces/cliente.interface';
import { clienteAc } from '../interfaces/clienteAc.interface';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ServiciosClienteService {

  constructor( public http:HttpClient) { }
  dataSource : MatTableDataSource<any>;


  httpOptions = {

    headers: new HttpHeaders({
      //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
      'Authorization': localStorage.getItem('usuario')
   })
  }

  private _url2: string= "https://getionibm.mybluemix.net/";
 //private _url2: string= "https://getionibm.mybluemix.net/";


 //clientes
 obtenerClientes() :Observable<any> {
  return this.http.get(this._url2+"cliente",this.httpOptions)
  // return this.http.get(this.heroesUrl, requestOptions)
}

crearClientes(body:clienteEst) :Observable<any> {
  // return this.http.get(this._urlc,this.httpOptions)
  console.log(body)
  return this.http.post(this._url2+"cliente/crear",body,this.httpOptions)
  // return this.http.get(this.heroesUrl, requestOptions)
}

actualizarClientes(body:clienteEst)  {
  console.log(body)
  return this.http.put(this._url2+"cliente/actualizar",body,this.httpOptions)
}
}

