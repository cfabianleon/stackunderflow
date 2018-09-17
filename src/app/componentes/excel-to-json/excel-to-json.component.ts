import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ExcelService } from '../../servicios/excel-service.service'
import * as XLSX from 'xlsx';
import {MultiDatePickerComponent} from '../multi-date-picker/multi-date-picker.component'
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource,  MatPaginator, MatSort  } from '@angular/material';

import {ForecastService} from '../../servicios/forecast.service'
import{CalendarioService} from '../../servicios/calendario.service'
import { element } from 'protractor';



@Component({
  selector: 'app-excel-to-json',
  templateUrl: './excel-to-json.component.html',
  styleUrls: ['./excel-to-json.component.css']
})
export class ExcelToJsonComponent implements OnInit {

  @ViewChild('fileSelect') fileSelect;
  @ViewChild('fileSelect2') fileSelect2;
  @ViewChild(MultiDatePickerComponent) picker;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fb: FormBuilder;
  consultorForm : FormGroup;
  fechaForm: FormGroup;
 
  consultorActual;
  fechas : any;
  selectedFile = null;
  data;
  data2;

  datosCargados = [];

  contratos;
  listaWi;
  listaConsultores;
  selected = 0;

  dashboard =[]

 
  lineChartData:Array<any> =  [];
  consultores:Array<any> = [];
  datos;
  horasPer:Array<any> = [];
  horas1;
  horas2;
  datosForecast = {};
  datosCalendario = {};
  claimsCargados = [];
  claimsFiltrados
  //Flags
  mostrarGrafica;
  cargarGrafica;

  mostrarDashboard;

  opcionSeleccionada;

  botonHabilitado;
  botonHabilitado2;

  calendarioCreado;
  fechasCompletas;

  archivosSubidos;

  showAllDates;

  //materials
  dataSource;
  displayedColumns: string[] = ['Dates']

  //variables de Q's
  datos2;
  listaConsultores2: any[] = [];

  

  constructor(fb: FormBuilder, fb2 :FormBuilder, private api: ForecastService,private api2:CalendarioService) {
    // this.data = []
    this.cargarGrafica = false;
    this.botonHabilitado = true;
    this.botonHabilitado2 = true;
    this.fechasCompletas = false;
    this.archivosSubidos = false;
    this.consultorActual = "default";
    this.calendarioCreado = true;
    this.opcionSeleccionada = false;
    this.mostrarGrafica = true;
    this.mostrarDashboard = false;
    this.showAllDates= true;
    this.dashboard = ['ID','consultor','forecast1','claim1','forecast2','claim2','forecast3','claim3']

    this.consultorForm = fb.group({
      consultorControl : ['',Validators.required],
      contratoControl : ['',Validators.required],
      wiControl : ['',Validators.required]
    })

    this.fechaForm = fb2.group({
      fechaControl : ['', Validators.required],
    })


    this.claimsCargados = []
    

  }

  
  subirArchivos(flag){

  
    
    // this.archivosSubidos = true;
    this.archivosSubidos=flag;
    this.api.actualizarForecast({data: this.datosCargados}).subscribe((resultado)=>{
      this.reset();
      this.consultorForm.get('contratoControl').setValue(null)
      this.consultorForm.get('wiControl').setValue(null)
      this.consultorForm.get('consultorControl').setValue(null)
   

      this.api.obtenerContratos().subscribe((resultado2)=>{
       
        this.contratos = resultado2.contrato;
        this.botonHabilitado = true;
        this.botonHabilitado2 = true;
        this.lineChartData = [];



       
      })

      
      // this.mostrarGrafica = flag;
      this.mostrarDashboard = flag;
    })
  }


  receiveMessage($event) {
    
    this.fechas = $event
    this.fechasCompletas = true;
    this.api2.guardarCalendario({dates:this.fechas}).subscribe((resultado)=>{
     
    })
    console.log(this.fechas);

  }

  pedirFecha($event) {
    
    
    this.api2.buscarCalendario({dates:this.fechas}).subscribe((resultado)=>{
     
    })
    console.log(this.fechas);

  }


 

  // obtenerCalendarios(){
  //   this.api2.obtenerCalendario().subscribe((datos)=>{
  //     this.dataSource = new MatTableDataSource(datos.data);
     
  //   })
  //   console.log(this.dataSource);
  // }
  reset() {
    this.fileSelect.nativeElement.reset()
    this.fileSelect2.nativeElement.reset()
    this.selectedFile = null;
    this.cargarGrafica = false;
    this.botonHabilitado = true;
    this.botonHabilitado2 = true;
    this.lineChartData = [];

  }


  public lineChartLabels:Array<any> = ['Enero','Febrero','Marzo','Abril','Mayo'
  ,'Junio','Julio','Agosto','Septiembre', 'Octubre', 'Noviembre','Diciembre'];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
    xAxes: [{
      ticks: {
          autoSkip: false
      }
  }]
  }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(125,195,235,0)',
      borderColor: 'rgba(125,195,235,1)',
      pointBackgroundColor: 'rgba(125,195,235,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(125,195,235,1)'
    },
    { // dark grey
      backgroundColor: 'rgba(249,108,65,0)',
      borderColor: 'rgba(249,108,65,1)',
      pointBackgroundColor: 'rgba(249,108,65,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(249,108,65,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  cargarWi(contrato){
    var body  = {
      'contrato': contrato,
    }
    this.api.buscarProyectos(body).subscribe((resultado)=>{
      this.listaWi = resultado.wi_proyecto;
      this.consultorForm.get('wiControl').setValue(null)
      this.consultorForm.get('consultorControl').setValue(null)

      

    })
  }

    cargarConsultores() {
        let contrato = this.consultorForm.controls.contratoControl.value;
        let wi = this.consultorForm.controls.wiControl.value;
        let body = {
            contrato: contrato,
            wi_proyecto: wi
        }
        console.log(body)

        this.consultorForm.get('consultorControl').setValue(null)

        this.api.buscarConsultores(body).subscribe((resultado) => {

            this.convert2(this.selectedFile, () => {
              this.listaConsultores = resultado.data;


                this.consultores = resultado.data;

                this.datos = {};

                var arregloTemp = this.data2.slice(0);
                console.log(this.fechas)
                var contador = 0;

                
                //Metodo antiguo
                for (let i = 0; i < this.consultores.length; i++) {
                    var consultor = this.consultores[i].id_consultor;
                    // console.log(consultor)
                    if (consultor.length < 6) {
                        consultor = "0" + consultor
                    }
                    this.horasPer = [];
                    for (let j = 0; j < this.fechas.length - 1; j++) {
                        //  var datedic =new Date(this.fechas[j]);
                        //  var dateend1 = new Date(this.fechas[j+1]);
                        var datedic = new Date(moment(this.fechas[j], "YYYY-MM-DD").format("MM/DD/YYYY"));
                        var dateend1 = new Date(moment(this.fechas[j + 1], "YYYY-MM-DD").format("MM/DD/YYYY"));

                        this.horas1 = 0;
                        var prueba = [];
                        for (let k = 0; k < this.data2.length; k++) {
                            let row = this.data2[k];
                            var tempdate = new Date(row["Week Ending Date"]);
                            let consultorActual = row["Employee Serial Number"].replace(/\s+/, "")
                            let wiActual = row["Account Id"].replace(/\s+/, "");
                            let contratoActual = row["Account Group Id"].replace(/\s+/, "");
                            if (consultorActual == consultor && wiActual == wi && contratoActual == contrato) {

                                if ((tempdate > datedic) && (tempdate <= dateend1)) {
                                    this.horas1 = this.horas1 + Number(row["Hours"]);

                                    arregloTemp[k] = null;
                                    contador++;
                                    // this.data2.splice(k,1)
                                }
                            } else {
                              if(wiActual != wi || contratoActual != contrato){
                                arregloTemp[k] = null;
                              }
                            }
                        }
                        this.horasPer.push(Math.round(this.horas1 * 10) / 10);
                    }
                    this.datos[consultor] = this.horasPer;
                }
                console.log("Cargooooooooo")
                console.log(arregloTemp)

                for(let i = 0;i<arregloTemp.length;i++){
                  let registro = arregloTemp[i];
                  if(registro!=null){
                    prueba.push(registro)
                    let tempdate = new Date(registro["Week Ending Date"]);
                    let consultorActual = registro["Employee Serial Number"].replace(/\s+/, "")

                    let nombreActual = registro['Employee Name']
                    let horasActuales = Number(registro['Hours'])
                    
                    
                    this.datosForecast[consultorActual] = {data:[0,0,0,0,0,0,0,0,0,0,0,0], label : 'Forecast'};

                    let estaInsertado = false;
                    for(let k = 0;k<this.listaConsultores.length;k++){
                      if(this.listaConsultores[k].id_consultor == consultorActual){
                        estaInsertado = true;
                      }
                    }

                    if(!estaInsertado){
                      this.datos[consultorActual] = [0,0,0,0,0,0,0,0,0,0,0,0];
                      this.listaConsultores.push(
                        {
                          id_consultor: consultorActual,
                          nombre_consultor: nombreActual,
                          horas: [0,0,0,0,0,0,0,0,0,0,0,0],
                          noForecast : true
                        }
                      )
                    }
                    

                    for (let j = 0; j < this.fechas.length - 1; j++) {
                      //  var datedic =new Date(this.fechas[j]);
                      //  var dateend1 = new Date(this.fechas[j+1]);
                      var datedic = new Date(moment(this.fechas[j], "YYYY-MM-DD").format("MM/DD/YYYY"));
                      var dateend1 = new Date(moment(this.fechas[j + 1], "YYYY-MM-DD").format("MM/DD/YYYY"));
                      if ((tempdate > datedic) && (tempdate <= dateend1)) {
                        console.log("Prueba 14")
                        let arregloHoras = this.datos[consultorActual].slice(0);
                        console.log(arregloHoras)
                        arregloHoras[j] += horasActuales;
                        console.log(arregloHoras)
                        this.datos[consultorActual] = arregloHoras;
                        
                        console.log(this.datos)
                        break; 
                      }


                    
                  }
                }
            
              }
                    // console.log(prueba)
            console.log("arreglo claim")
            console.log(this.datos)
            console.log(prueba)

            console.log(this.listaConsultores)

            this.listaConsultores2 = JSON.parse(JSON.stringify(this.listaConsultores))
            this.listaConsultores2 = this.cambiarFechas(this.listaConsultores2)
            console.log(this.listaConsultores)
            console.log(this.listaConsultores2)
            this.datos2 = JSON.parse(JSON.stringify(this.datos))
            this.datos2 = this.cambiarFechasClaim(this.datos2, this.listaConsultores2)
            
            console.log("Cargo los datos")
            })


            
        })
    }

  cambiarFechasClaim(array: any[], array2: any[]) {
    let arrayRes: any[] = []
    array2.forEach(element => {
      let id = element.id_consultor
      let claimQ =
        [
          {
            q1: [],
            q2: [],
            q3: [],
            q4: []
          }
        ]
      for (let i in array[id]) {
        let val = parseInt(i)
        if (val < 3) {
          claimQ[0].q1.push(array[id][i])
        }
        else if (val >= 3 && val < 6) {
          claimQ[0].q2.push(array[id][i])
        }
        else if (val >= 6 && val < 9) {
          claimQ[0].q3.push(array[id][i])
        }
        else {
          claimQ[0].q4.push(array[id][i])
        }
      }
      array[id] = claimQ
    });
    return arrayRes = array
  }

  // metodo prueba
  cambiarFechas(array: any[]) {
    let arrayRes: any[] = []
    array.forEach(element => {

      let forecastQ =
        [
          {
            q1: [],
            q2: [],
            q3: [],
            q4: []
          }
        ]
      for (let i in element.horas) {
        let val = parseInt(i)
        if (val < 3) {
          forecastQ[0].q1.push(element.horas[i])
        }
        else if (val >= 3 && val < 6) {
          forecastQ[0].q2.push(element.horas[i])
        }
        else if (val >= 6 && val < 9) {
          forecastQ[0].q3.push(element.horas[i])
        }
        else {
          forecastQ[0].q4.push(element.horas[i])
        }
      }
      element.horas = forecastQ
    });
    return arrayRes = array
  }

  graficar()
  {
    this.lineChartData = [];
    this.cargarGrafica = false;
    this.showAllDates = false;
    console.log("selección")
    let id = this.consultorForm.controls.consultorControl.value.id_consultor;
    this.consultorActual = this.consultorForm.controls.consultorControl.value;
    console.log(id)
    console.log("Datos del forecast")
    console.log(this.datosForecast)
    console.log(this.datosForecast[id])
    this.lineChartData.push(this.datosForecast[id])

    if(id.length ==5 ){
      id = "0"+id;
    }
    this.lineChartData.push({data : this.datos[id], label : 'Claim'})
      this.cargarGrafica = true;
  }

  cargarCalendario(flag){
    this.fechas = [];
    // this.showAllDates=false;
    this.showAllDates=!flag;

    let seleccion = this.fechaForm.controls.fechaControl.value;
    this.opcionSeleccionada = flag;
    // this.opcionSeleccionada = true;

    this.fechasCompletas = flag;
    

 
    this.api2.buscarCalendario({año:seleccion}).subscribe((resultado)=>{
     this.fechas= resultado.data.dates;
     
    console.log(this.fechas)
    })


  }

  verGrafica(){
    this.mostrarGrafica = true;
    this.mostrarDashboard = false;
    this.showAllDates=false;
  }

  verDashboard(){
    this.mostrarGrafica = false;
    this.mostrarDashboard = true;
    this.cargarGrafica = false;
    this.showAllDates=false;
    
  }

  crearCalendario(flag){
    this.calendarioCreado = !flag;
    this.opcionSeleccionada = flag;
    this.showAllDates=!flag;
  }




  crearCalendario2(flag){
    this.calendarioCreado = !flag;
    this.opcionSeleccionada = flag;
    this.showAllDates=!flag;
  }


  onFileSelected(event) {

    this.selectedFile = event.target.files;
    this.botonHabilitado = false;
    this.showAllDates=false;
    this.datosCargados = []

    this.convert(event, () => {

      let datosConsultor = {}
      // let datosPorId = {}
      let horas = []
      let horasN = []

      for(let i = 0;i<this.data.length;i++){
        console.log(this.data);
        let consultor = this.data[i]
        console.log(consultor)
        console.log("Longitud: "+consultor.length)
        console.log("codigo: 0"+consultor["id consultor"])
        this.consultores.push(consultor["id consultor"])
        for(var key in consultor){
          if(key.startsWith('horas')){
            horas.push(Number(consultor[key]));
            horasN.push({
              cantidad: Number(consultor[key]) ,
              fecha: key.split(" ")[1]
            })
            horas.push()
            console.log(key.split(" "))
          }
        }


        let id = consultor['id consultor'].replace(/\s+/, "");

        if(id.length == 5){
          id = "0"+id;
          console.log(id)
        }
        // console.log(horasN)
        datosConsultor = { data: horas, label: 'Forecast' }
        this.datosForecast[id] = datosConsultor;

        


        let datos = {
          banda_consultor: consultor['Banda consultor'],
          contrato: consultor['contrato'].replace(/\s+/, "") ,
          horas: horas,
          id_consultor: id,
          nombre_consultor:  consultor['nombre consultor'],
          nombre_proyecto: consultor['nombre proyecto'],
          wi_proyecto: consultor['wi proyecto'].replace(/\s+/, "")
        }

     
        this.datosCargados.push(datos)

        
      
        // console.log("Datos enviados")
        // console.log(datosConsultor)
        // this.lineChartData.push(datosConsultor)
        horasN = []
        horas = []
      }
      console.log("Prueba ultimaaa")
      console.log(this.datosCargados)

      this.api.obtenerForecast().subscribe((resultado)=>{
      })

      // this.api.guardarForecast(this.datosCargados).subscribe((resultado)=>{
        
        
      // })
      
      


      
    })

  }

  onFileSelected2(event){
  
    this.selectedFile = event;
    this.botonHabilitado2 = false;
    this.showAllDates=false;
    
      
   } 


  convert(evt: any, callback) {
    // debugger
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: any = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        this.data = <any>(XLSX.utils.sheet_to_json(ws));
        console.log("Prueba T")
        console.log(this.data)

        callback();

      };
      reader.readAsBinaryString(target.files[0]);
      // return this.data;
    }
  }

  
  convert2(evt: any, callback){
    // debugger
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1){
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: any = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      /* grab first sheet */
      const wsname: string = wb.SheetNames[1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data2 = <any>(XLSX.utils.sheet_to_json(ws));
      console.log("Prueba T")

      callback();

   };
    reader.readAsBinaryString(target.files[0]);
    // return this.data;
   }
  }


  ngOnInit() {

   
      this.api2.obtenerCalendario().subscribe((datos)=>{
// for(var i=0 ; i<1 ;i++){

  this.dataSource = []
  var concatenacion =[];

  for(let i = 0;i<datos.data.length;i++){
    console.log(datos.data[i].dates)
    this.dataSource.concat(datos.data[i].dates)
    concatenacion= concatenacion.concat(datos.data[i].dates)
    console.log()
  }
this.dataSource = concatenacion;
this.dataSource =new MatTableDataSource(concatenacion);
  console.log(this.dataSource)
  

this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;


 this.fechas=this.dataSource;
    })


    this.api.obtenerContratos().subscribe((resultado)=>{
      this.contratos = resultado.contrato;
    })

    this.api2.obtenerYear().subscribe((resultado)=>{

      this.claimsCargados= resultado.año;
    })

   
   


    
  }

  

}