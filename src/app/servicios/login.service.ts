import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { login } from '../interfaces/login.interface'
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //url = 'https://getionibm.mybluemix.net/';
  url = 'https://getionibm.mybluemix.net/'
  helper = new JwtHelperService();
  
  constructor( private http:HttpClient ) { }

  login( login:login ) : Observable<any> {
    console.log( login )
    return this.http.post( `${ this.url }auth/login`, login ) 
  }

  logout(  ) : Observable<any> {
    return this.http.get( `${ this.url }auth/logout` )
  }

  loginCliente( cliente:login ): Observable<any>{
    return this.http.post(`${this.url}auth/loginCliente`, cliente)
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('usuario');
    // Check whether the token is expired and return
    // true or false
    // console.log( 'token: ' + !this.helper.isTokenExpired(token) )
    return !this.helper.isTokenExpired(token);
  }
}
