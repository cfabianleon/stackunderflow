import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import { reciente } from '../interfaces/recientes.interface';


@Injectable({
  providedIn: 'root'
})
export class IndexService {

	httpOptions = {

	  headers: new HttpHeaders({
	    //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jbGllbnRlIjoiMzQ1NjAwNCIsIm5vbWJyZV9jb25zdWx0b3IiOiJGYWJpYW4iLCJyb2wiOiJHZXJlbnRlIiwiaWF0IjoxNTMzMTU1MDczLCJleHAiOjE1MzMyNDE0NzN9.hUoQnE112YEYSAga4RS9UzISAfjR_Avde_Cb8TY4XGc'
	    'Authorization': localStorage.getItem('usuario')
	 })
	}
	//private _url = 'https://getionibm.mybluemix.net/';
	private _url: string= "https://getionibm.mybluemix.net/";


  constructor(public http:HttpClient) { }

	obtenerRecientes() :Observable<any> {
	  return this.http.get(this._url+"reciente",this.httpOptions)
	  // return this.http.get(this.heroesUrl, requestOptions)
	}

	buidlObservable(): Observable<any>{
		return Observable.create(function(observer){
			setInterval(()=> observer.next("Hola"),1000)
		});
	}

	
}
