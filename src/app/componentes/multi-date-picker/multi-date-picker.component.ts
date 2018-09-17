import { Component, OnInit,Input,Output,EventEmitter ,DoCheck} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { ToastrService } from 'ngx-toastr';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-multi-date-picker',
  templateUrl: './multi-date-picker.component.html',
  styleUrls: ['./multi-date-picker.component.css']
})
export class MultiDatePickerComponent implements OnInit {
  datatable;
  dataSource
  displayedColumns : string[] = ['Year','Month','Day'];

  datesSize;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  _datesSelected:NgbDateStruct[]=[]; 

  resultado: any[]=[{
    cortes: []
  }]

  @Output() messageEvent = new EventEmitter<any>();

  sendMessage() {
    this.messageEvent.emit(this.resultado[0].cortes)
  }

  @Input()
  set datesSelected(value:NgbDateStruct[])  
  {
     this._datesSelected=value;
  }
  get datesSelected():NgbDateStruct[]
  {
    return this._datesSelected?this._datesSelected:[];
  }

  @Output() datesSelectedChange=new EventEmitter<NgbDateStruct[]>();

  constructor(calendar: NgbCalendar,private toastr: ToastrService) { 
    this.datesSize = 0;
  }

  onDateSelection(event:any,date: NgbDateStruct) {

    event.target.parentElement.blur();  //make that not appear the outline
    if (!this.fromDate && !this.toDate) {
      if (event.ctrlKey==true)  //If is CrtlKey pressed
        this.fromDate = date;
      else
        this.addDate(date);

      this.datesSelectedChange.emit(this.datesSelected);

    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.addRangeDate(this.fromDate,this.toDate);
      this.fromDate=null;
      this.toDate=null;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

  }

findmonthyear(date:NgbDateStruct){
  var cont=0;
for (var i =1;i<32;i++){
  let index=this.datesSelected.findIndex(f=>f.day==i && f.month==date.month && f.year==date.year);
  if(index>-1){
    if(date.month == 1 && cont <1){
      cont++;
    } else {
      return false;
    }
  }
}
return true;

}


addDate(date:NgbDateStruct)
{

let index=this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year);
if (index>=0) {      //If exist, remove the date
  this.datesSelected.splice(index,1);
  this.datesSize--;}
else if(this.findmonthyear(date)){  //a simple push

    this.datesSelected.push(date);
    this.datesSize++;
    this.dataSource = this.datesSelected;
    
    // this.datatable = this.dataSource.filteredData;
    console.log(this.datatable)

  }else{
    this.toastr.error('Solo se puede seleccionar un dia de corte claim por mes', 'Mensaje');
    //  alert("ya existe un campo");
  }
    
  }

    addRangeDate(fromDate:NgbDateStruct,toDate:NgbDateStruct)
    {
        //We get the getTime() of the dates from and to
        let from=new Date(fromDate.year+"-"+fromDate.month+"-"+fromDate.day).getTime();
        let to=new Date(toDate.year+"-"+toDate.month+"-"+toDate.day).getTime();
        for (let time=from;time<=to;time+=(24*60*60*1000)) //add one day
        {
            let date=new Date(time);
            //javascript getMonth give 0 to January, 1, to February...
            this.addDate({year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()});
        }   
        this.datesSelectedChange.emit(this.datesSelected);
    }
    //return true if is selected
    isDateSelected(date:NgbDateStruct)
    {
        return (this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year)>=0);
    }
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);



  
  limpiar(){
    this._datesSelected=[];
    this.dataSource = [];
    this.datesSize = 0;



  }

  ngOnInit() {
  }

  mostrar() {
    
    this.datesSelected.forEach((date, index) => {
      let año = date.year
      let mes = date.month-1
      let dia = date.day
      let fecha = new Date(año, mes,dia)
      var fechaMod = moment(fecha).format("YYYY-MM-DD")
      this.resultado[0].cortes.push(fechaMod)
      if(mes === 6) {
        this.resultado[0].fecha = fecha.getFullYear()
      }
    })
    this.resultado[0].cortes = this.resultado[0].cortes.sort()
    console.log(this.resultado[0].cortes)
    this.sendMessage();
  }

}
