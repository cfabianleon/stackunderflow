import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportesService } from '../../../servicios/reportes.service';
import { ClassGetter } from '../../../../../node_modules/@angular/compiler/src/output/output_ast';
import {AtencionService} from '../../../servicios/atencion.service'
import { Subscriber } from '../../../../../node_modules/rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {

  public primeraVez : boolean = true;

  // Doughnut
  public tareas=[]
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions: any;
  selected = new FormControl(0);

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public finalizadas;
  public planeacion;
  public ejecucion;
  public stopper;
  

  //Datos
  public listaRequerimientos;
  constructor(public _reportes:ReportesService, private api:AtencionService) {

    this.api.obtenerRequerimientos().subscribe((datos)=>{
      this.listaRequerimientos = datos.data;
    })

   }

  ngOnInit() {
    // this.getReporte(3);  
    this.selected.setValue(0);
  }

  obtenerDatos(seleccion){
    this.primeraVez = false;

    for(let i = 0;i<4;i++){
      this.doughnutChartData.pop()
      this.doughnutChartLabels.pop()
    }

    console.log(seleccion.value.ID_ATENCION)
    let id = seleccion.value.ID_ATENCION;
  

    this.getReporte(id);
  }



  getReporte(id){
    let finalizadas;
    let planeacion;
    let ejecucion;
    let stopper;

    //console.log("Valor de la seleccion "+seleccion)
    this._reportes.getTareasFinalizadas(id).subscribe((data:any) => {
      console.log("Finalizada")
      this.tareas=data.data
      console.log(this.tareas.length)
      finalizadas = this.tareas.length;
      

      this._reportes.getTareasPlaneacion(id).subscribe((data:any)=>{
        console.log("Planeacion")
        this.tareas = data.data
        console.log(this.tareas.length)
        planeacion = this.tareas.length;
        



        this._reportes.getTareasEjecucion(id).subscribe((data:any)=>{
          console.log("Ejecucion")

          this.tareas = data.data
          console.log(this.tareas.length)
          ejecucion = this.tareas.length;
          console.log("Numero de ejecuciones "+ejecucion)


            this._reportes.getTareaStopper(id).subscribe((data:any)=>{
              console.log("Stopper")
              this.tareas = data.data
              console.log(this.tareas.length)
              stopper = this.tareas.length;

              this.doughnutChartData.push(finalizadas)
              this.doughnutChartLabels.push('Finalizadas '+finalizadas)

              this.doughnutChartData.push(planeacion)
              this.doughnutChartLabels.push('Planeación '+planeacion)

              this.doughnutChartLabels.push('Ejecución '+ejecucion)
              this.doughnutChartData.push(ejecucion)

              this.doughnutChartLabels.push('Stopper '+stopper)
              this.doughnutChartData.push(stopper) 

              let total = finalizadas + ejecucion + stopper + planeacion;             
              this.doughnutChartOptions = {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem,data){
                      var label = data.labels[tooltipItem.index] || '';
                      if(label){
                        label +=': ';
                      }
                      
                      var value = data.datasets[0].data[tooltipItem.index];
                      label += Math.round(value*100 / total);
                      return label + "%";

                    }
                  }
                }
              }
            })


        })

  
  
      })

    })


  }

}
