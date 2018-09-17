import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {

data;
constructor() { }


public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}

public excelToJson(document: any){
  const workbook: XLSX.WorkBook = document;
  const ws:  XLSX.WorkSheet = workbook.Sheets['data']
  const data = <any> (XLSX.utils.sheet_to_json(ws,{header:1}));
  console.log(workbook)
  console.log(data)
}

  convert(evt: any){
  // debugger
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  console.log(target.files.length);
  if (target.files.length == 1){
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: any = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    console.log(wb);
    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    /* save data */
    this.data = <any>(XLSX.utils.sheet_to_json(ws));
    console.log(this.data)
    // console.log(this.data[0])
 };
  reader.readAsBinaryString(target.files[0]);
  // return this.data;
  
 }
}



}