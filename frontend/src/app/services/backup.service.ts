import { Injectable } from '@angular/core';


import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class BackupService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  
  insert_direccion(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'backup',data,{headers:headers});
  }
}
