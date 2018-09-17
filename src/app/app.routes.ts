import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import {CrearProyectoComponent} from './componentes/proyecto//crear-proyecto/crear-proyecto.component'
import { TablaRecursosComponent } from './componentes/recursos/tabla-recursos/tabla-recursos.component'
import {DialogoConsultarRequisitoComponent} from './componentes/requerimientos/dialogo-consultar-requisito/dialogo-consultar-requisito.component';
import { TablaListarComponent } from './componentes/tarea/tabla-listar/tabla-listar.component'; 
import { ClientesComponent } from './componentes/clientes/clientes/clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { TablaRecientesComponent } from './componentes/index/tabla-recientes/tabla-recientes.component';
import { DialogoCrearEjecucionComponent} from './componentes/index/dialogo-crear-ejecucion/dialogo-crear-ejecucion.component';
import { AplicacionComponent }  from './componentes/aplicacion/aplicacion.component'
import { DashboardComponent } from './componentes/dashboard/dashboard.component'
//Seguridad de rutas
import { GuardService } from './servicios/guard.service'
import { RolguardService } from './servicios/rolguard.service'
import { LineasComponent } from './componentes/lineas/lineas/lineas.component';
import { HomeComponent } from './componentes/home/home.component';
import { BarrasComponent } from './componentes/reportes/barras/barras.component';
import { DoughnutComponent } from './componentes/reportes/doughnut/doughnut.component';
import { TablaCostosComponent} from './componentes/reportes/tabla-costos/tabla-costos.component';
import { AuditoriaComponent } from './componentes/reportes/auditoria/auditoria.component';
import { PeticionComponent } from './componentes/clientes/peticion/peticion.component'
import { ClienteComponent } from  './componentes/cliente/cliente.component'
import { ExcelToJsonComponent } from './componentes/excel-to-json/excel-to-json.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cliente', component: ClienteComponent, canActivate: [GuardService], 
        children:[
            { path: 'peticion', component: PeticionComponent, canActivate: [GuardService] },
            { path: '**', pathMatch: 'full', redirectTo: 'peticion' }
        ] },
    { path: 'inicio', component: HomeComponent, canActivate:[GuardService], 
        children: [
            { path: 'proyectos', component: ProyectoComponent, canActivate:[GuardService] },
            { path: 'barras', component: BarrasComponent, canActivate:[GuardService] },
            { path: 'reporte/requerimientos', component: DoughnutComponent, canActivate:[GuardService] },
            { path: 'proyectos/crear', component: CrearProyectoComponent, canActivate:[GuardService] },
            { path: 'recursos', component: TablaRecursosComponent, canActivate:[GuardService] },
            { path: 'requerimiento',component:DialogoConsultarRequisitoComponent, canActivate:[GuardService]},
            { path: 'tarea', component:TablaListarComponent, canActivate:[GuardService] },
            { path: 'clientes', component: ClientesComponent, canActivate:[GuardService, RolguardService], data: { expectedRole: 'Gerente' } },
            { path: 'lineas', component: LineasComponent, canActivate:[GuardService] },
            { path: 'reciente', component: TablaRecientesComponent, canActivate:[GuardService] },
            { path: 'crearejecucion', component:  DialogoCrearEjecucionComponent, canActivate:[GuardService]},
            { path: 'aplicacion', component: AplicacionComponent, canActivate:[GuardService] },
            { path: 'reporte/datos-aplicacion', component:TablaCostosComponent   },
            { path: 'reporte/auditoria', component:AuditoriaComponent},
            { path: 'peticion', component:PeticionComponent},
            { path: 'leer-excel', component: ExcelToJsonComponent},
            { path: 'dashboard', component: DashboardComponent, canActivate:[GuardService] },
            { path: '**', pathMatch: 'full', redirectTo: 'reciente' }
        ] },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

]


export const APP_ROUTING = RouterModule.forRoot(routes);
