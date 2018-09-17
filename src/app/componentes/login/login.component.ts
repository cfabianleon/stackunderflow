import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { login } from '../../interfaces/login.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password = "";
  correo = "";
  tipo
  cargando = false;

  constructor( private _servicio:LoginService, private router:Router ) { }

  login(){
    this.cargando = true;
    let usuario: login = {
      correo: this.correo,
      password:this.password
    }
    if(this.tipo == 'Recurso' || !this.tipo){
      this._servicio.login( usuario ).subscribe( (data)=>{
        this.cargando = true;
        localStorage.setItem('usuario', data.token);
        this.router.navigate(['inicio'])      
      })
    }else{
      this._servicio.loginCliente( usuario ).subscribe(( data )=>{
        localStorage.setItem('usuario', data.token);
        this.router.navigate(['cliente'])
      })
    }

  }

  ngOnInit() {
  }

}
