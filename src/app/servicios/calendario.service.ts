import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class CalendarioService {

  constructor(public http:HttpClient) {
   }


   dataSource : MatTableDataSource<any>;
   fabiano:any;
   url = 'https://getionibm.mybluemix.net/';
    //  url = 'https://getionibm.mybluemix.net/';

   
  obtenerCalendario():Observable<any>{
    return this.http.get(this.url+'calendario')
  }


  obtenerYear():Observable<any>{
    return this.http.get(this.url+'calendario/year')
  }

  guardarCalendario(body):Observable<any>{
    return this.http.post(this.url+'calendario/crear',body)
  }

  borrarCalendario():Observable<any>{
    return this.http.get(this.url+'calendario/borrar')
  }

  buscarCalendario(body):Observable<any>{
    return this.http.post(this.url+'calendario/buscar',body)
  }

}
