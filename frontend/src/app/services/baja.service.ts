import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BajaService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

  get_baja(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"bajas/"+filtro,{headers:headers});
  }

  insert_baja(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'baja/registrar',data,{headers:headers});
  }
}
