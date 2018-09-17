import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service'
import decode from 'jwt-decode';
import { intFiltro } from '../interfaces/tareaFiltro.interface';


@Injectable({
  providedIn: 'root'
})
export class RolguardService {

  constructor(public auth: LoginService, public router: Router) { }

  canActivate( route:ActivatedRouteSnapshot ) : boolean{
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('usuario');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.rol.toUpperCase() !== expectedRole.toUpperCase()
    ) {
      console.log(`No es ${ expectedRole } es ${ tokenPayload.rol }`)
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  quienSoy( usuario:number ) : boolean{
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    if ( !this.auth.isAuthenticated() || tokenPayload.id_cliente !== usuario ) {
      return false;

    }
    return true
  }

  soyGerente() : boolean{
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    if ( !this.auth.isAuthenticated() || tokenPayload.rol.toUpperCase() == 'GERENTE' ) {
      return false;

    }
    return true
  }

  idNombre() : intFiltro{
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    console.log(tokenPayload)
    let idCon : intFiltro
    if ( this.auth.isAuthenticated()) {
      let idCon : intFiltro = {
        id: tokenPayload.id_cliente,
        rol: tokenPayload.rol,
        nombre: tokenPayload.nombre_consultor
      }
      return idCon
    }
    return idCon
  }

  idCliente() :number{
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    return tokenPayload.nombre_cliente
  }

  idConsultor(): number {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token)
    return tokenPayload.id_cliente
  }
}
