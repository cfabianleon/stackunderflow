import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {RolguardService} from './rolguard.service'

@Injectable({
  providedIn: 'root'
})
export class LineaService {

  httpOptions = {
    headers: new HttpHeaders({
     // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiQjEwMDAwMCIsIm5vbWJyZV9jb25zdWx0b3IiOiJKb3NlIEFsdmFyZXoiLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTM1NzI4ODI0LCJleHAiOjE1MzU4MTUyMjR9.i5Ev-igfAJ3Y83m02-uf41GhHmsAuC93Pdh8xQflNo0'
     'Authorization': localStorage.getItem('usuario')
    })
   };

 
  url = 'https://getionibm.mybluemix.net/';
  //url = 'https://getionibm.mybluemix.net/';


  constructor(public http:HttpClient, public rol:RolguardService) { }
  dataSource : MatTableDataSource<any>;

  crearLinea(body):Observable<any>{
    console.log("Ingreso a crear una línea")
    console.log(body)
    return this.http.post(this.url+'lineaservicio/crear/',body,this.httpOptions);
  }

  obtenerLineas():Observable<any>{
    console.log("Ingreso a obtener todas las líneas")
    console.log(this.rol.idConsultor())
    return this.http.get(this.url+'lineaservicio/'+this.rol.idConsultor(),this.httpOptions);
  }

  actualizarLinea(body): Observable<any>{
    console.log("Datos que llegaron a actualizar")
    console.log(body)
   return this.http.put(this.url+"lineaservicio/actualizar",body,this.httpOptions)
  }
}

