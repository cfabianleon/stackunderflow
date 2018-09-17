import { Component, OnInit } from '@angular/core';
import {RolguardService} from '../../servicios/rolguard.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public login:RolguardService) { }

  ngOnInit() {
  }

}
