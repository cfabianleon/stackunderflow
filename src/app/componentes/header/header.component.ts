import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public router:Router, private servicio:LoginService ) { }

  irLogin(){
    this.router.navigate( ['/login'] )
  }

  logout(){
    this.servicio.logout().subscribe(()=>{
      localStorage.removeItem('usuario')
      console.log(localStorage.getItem('usuario'));
      this.router.navigate( ['/login'] )
      
    })
  }

  
  sesionIniciada():boolean{
    if(localStorage.getItem('usuario') == null){
      return false
    }else{
      //this.usuarioCambio = JSON.parse(localStorage.getItem('usuario'))
      return true;
    }
  }


  ngOnInit() {
  }

}
