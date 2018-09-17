import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { MatTableModule } from '@angular/material/table';


// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatBadgeModule} from '@angular/material/badge';



//Lenguaje es-CO

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';
import localeESExtra from '@angular/common/locales/extra/es-CO';
registerLocaleData(localeES, 'es-CO', localeESExtra);
import { LOCALE_ID } from '@angular/core';



import { ToastrModule } from 'ngx-toastr';

// Rutas
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { TablaRecursosComponent } from './componentes/recursos/tabla-recursos/tabla-recursos.component';
import { DialogoPostRecursoComponent } from './componentes/recursos/dialogo-post-recurso/dialogo-post-recurso.component';
import { DialogoPostComponent } from './componentes/recursos/dialogo-post/dialogo-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaListarComponent } from './componentes/tarea/tabla-listar/tabla-listar.component';
import { RegistrarTareaComponent } from './componentes/tarea/registrar-tarea/registrar-tarea.component';
import { ActualizarTareaComponent } from './componentes/tarea/actualizar-tarea/actualizar-tarea.component';
import { FinalizarTareaComponent } from './componentes/tarea/finalizar-tarea/finalizar-tarea.component';

import { ChartsModule } from 'ng2-charts';


import { HttpClientModule } from '@angular/common/http';
import { CrearProyectoComponent } from './componentes/proyecto/crear-proyecto/crear-proyecto.component'
import { ApiProyectoService } from './servicios/api-proyecto.service';
import { RequerimientosComponent } from './componentes/requerimientos/requerimientos.component';
import { CrearRequerimientosComponent } from './componentes/requerimientos/crear-requerimientos/crear-requerimientos.component';
import { ActualizarRequerimientosComponent } from './componentes/requerimientos/actualizar-requerimientos/actualizar-requerimientos.component';
import { EjecucionComponent } from './componentes/ejecucion/ejecucion.component';
import { DialogoPutRecursoComponent } from './componentes/recursos/dialogo-put-recurso/dialogo-put-recurso.component';
import { DialogoPutComponent } from './componentes/recursos/dialogo-put/dialogo-put.component';
import { ClientesComponent } from './componentes/clientes/clientes/clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { ClientesPostDialogComponent } from './componentes/clientes/clientes-post-dialog/clientes-post-dialog.component';

import { LoginService } from './servicios/login.service';
import { AplicacionService } from './servicios/aplicacion.service'
import { DialogoPostProyectoComponent } from './componentes/proyecto/dialogo-post-proyecto/dialogo-post-proyecto.component';

import { DialogoRegistrarTareaComponent } from './componentes/tarea/dialogo-registrar-tarea/dialogo-registrar-tarea.component'

import { DialogoActualizarTareaComponent } from './componentes/tarea/dialogo-actualizar-tarea/dialogo-actualizar-tarea.component';
//import { ActualizarTareaComponent } from './componentes/tarea/actualizar-tarea/actualizar-tarea.component';


import { TablaRecientesComponent } from './componentes/index/tabla-recientes/tabla-recientes.component';
import { DialogoTareaEjecucionComponent } from './componentes/index/dialogo-tarea-ejecucion/dialogo-tarea-ejecucion.component';
import { DialogoTareaEjecucionButtonComponent } from './componentes/index/dialogo-tarea-ejecucion-button/dialogo-tarea-ejecucion-button.component';
import { DialogoTareaEjecucionAddButtonComponent } from './componentes/index/dialogo-tarea-ejecucion-add-button/dialogo-tarea-ejecucion-add-button.component'


import { ActualizarProyectoComponent } from './componentes/proyecto/actualizar-proyecto/actualizar-proyecto.component';

import { ClientesPutDialogComponent } from './componentes/clientes/clientes-put-dialog/clientes-put-dialog.component';
import { DialogoAddEjecucionComponent } from './componentes/index/dialogo-add-ejecucion/dialogo-add-ejecucion.component';
import { DialogoCrearEjecucionComponent } from './componentes/index/dialogo-crear-ejecucion/dialogo-crear-ejecucion.component';
import { DialogoRegistrarRequisitoComponent } from './componentes/requerimientos/dialogo-registrar-requisito/dialogo-registrar-requisito.component';
import { AplicacionComponent } from './componentes/aplicacion/aplicacion.component';
import { CrearRecursoComponent } from './componentes/aplicacion/crear-recurso/crear-recurso.component';
import { CrearComponent } from './componentes/aplicacion/crear/crear.component';
import { DialogoConsultarRequisitoComponent } from './componentes/requerimientos/dialogo-consultar-requisito/dialogo-consultar-requisito.component';
import { GuardService } from './servicios/guard.service';
import { RolguardService } from './servicios/rolguard.service'
import { VerLineasComponent } from './componentes/proyecto/ver-lineas/ver-lineas.component';
import { VerLineasDialogComponent } from './componentes/proyecto/ver-lineas-dialog/ver-lineas-dialog.component';
import { LineasComponent } from './componentes/lineas/lineas/lineas.component';
import { LineasPutDialogComponent } from './componentes/lineas/lineas-put-dialog/lineas-put-dialog.component';
import { LineasPostDialogComponent } from './componentes/lineas/lineas-post-dialog/lineas-post-dialog.component';
import { BotonCrearComponent } from './componentes/index/boton-crear/boton-crear.component';
import { HomeComponent } from './componentes/home/home.component';
import { LineasPutComponent } from './componentes/lineas/lineas-put/lineas-put.component';
import { BarrasComponent } from './componentes/reportes/barras/barras.component';
import { DoughnutComponent } from './componentes/reportes/doughnut/doughnut.component';

import { DialogoActualizarComponent } from './componentes/requerimientos/dialogo-actualizar/dialogo-actualizar.component';
import { TablaCostosComponent } from './componentes/reportes/tabla-costos/tabla-costos.component';
import { ExcelService } from './servicios/excel-service.service';
import { PeticionComponent } from './componentes/clientes/peticion/peticion.component'
import { ActualizarAplicacionComponent } from './componentes/aplicacion/actualizar-aplicacion/actualizar-aplicacion.component';
import { ActualizarAplicacionDialogComponent } from './componentes/aplicacion/actualizar-aplicacion-dialog/actualizar-aplicacion-dialog.component';
import { AuditoriaComponent } from './componentes/reportes/auditoria/auditoria.component'
import { MatPaginator } from '../../node_modules/@angular/material';
import { DialogoDescripcionComponent } from './componentes/requerimientos/dialogo-descripcion/dialogo-descripcion.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ExcelToJsonComponent } from './componentes/excel-to-json/excel-to-json.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiDatePickerComponent } from './componentes/multi-date-picker/multi-date-picker.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';




// Servicio
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,

    ProyectoComponent,
    CrearProyectoComponent,
    TablaRecursosComponent,
    DialogoPostRecursoComponent,
    DialogoPostComponent,
    TablaListarComponent,
    RegistrarTareaComponent,
    DialogoActualizarTareaComponent,
    ActualizarTareaComponent,
    FinalizarTareaComponent,
    RequerimientosComponent,
    CrearRequerimientosComponent,
    DialogoConsultarRequisitoComponent,
    ActualizarRequerimientosComponent,
    EjecucionComponent,
    DialogoPutRecursoComponent,
    DialogoPutComponent,
    ClientesComponent,
    LoginComponent,
    ClientesPostDialogComponent,
    DialogoPostProyectoComponent,
    TablaRecientesComponent,
    DialogoTareaEjecucionComponent,
    DialogoTareaEjecucionButtonComponent,
    DialogoTareaEjecucionAddButtonComponent,
    DialogoRegistrarTareaComponent,
    ActualizarProyectoComponent,
    ClientesPutDialogComponent,
    DialogoAddEjecucionComponent,
    DialogoCrearEjecucionComponent,
    DialogoRegistrarRequisitoComponent,
    AplicacionComponent,
    CrearRecursoComponent,
    CrearComponent,
    DialogoConsultarRequisitoComponent,
    VerLineasComponent,
    VerLineasDialogComponent,
    LineasComponent,
    LineasPutDialogComponent,
    LineasPostDialogComponent,
    CrearRequerimientosComponent,
    HomeComponent,
    LineasPutComponent,
    BotonCrearComponent,
    HomeComponent,
    BarrasComponent,
    DoughnutComponent,
    DialogoActualizarComponent,
    TablaCostosComponent,
    PeticionComponent,
    ActualizarAplicacionComponent,
    ActualizarAplicacionDialogComponent,
    AuditoriaComponent,
    DialogoDescripcionComponent,
    ClienteComponent,
    ExcelToJsonComponent,
    MultiDatePickerComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpModule,
    ChartsModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    NgbModule.forRoot()

  ],
  providers: [
    ApiProyectoService,
    FormsModule,
    ReactiveFormsModule,
    LoginService,
    AplicacionService,
    GuardService,
    RolguardService,
    ExcelService,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  entryComponents: [
    DialogoPostComponent,
    DialogoPutComponent,
    ClientesPostDialogComponent,
    DialogoTareaEjecucionComponent,
    DialogoRegistrarTareaComponent,
    DialogoActualizarTareaComponent,
    RegistrarTareaComponent,
    ActualizarTareaComponent,
    ActualizarProyectoComponent,
    ClientesPutDialogComponent,
    DialogoAddEjecucionComponent,
    CrearComponent,
    DialogoRegistrarRequisitoComponent,
    DialogoConsultarRequisitoComponent,
    VerLineasComponent,
    LineasComponent,
    LineasPostDialogComponent,
    CrearRequerimientosComponent,
    DialogoCrearEjecucionComponent,
    CrearRequerimientosComponent,
    ActualizarRequerimientosComponent,
    LineasPutComponent,
    DoughnutComponent,
    ActualizarAplicacionComponent,
    ActualizarAplicacionDialogComponent,
    DialogoDescripcionComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
