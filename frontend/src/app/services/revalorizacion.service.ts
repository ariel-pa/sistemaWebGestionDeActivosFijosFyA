import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RevalorizacionService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

   get_activosRevalorizados(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"revalorizacion/"+filtro,{headers:headers});
  }

  insert_Revalorizacion(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'revalorizacion/registrar',data,{headers:headers});
  }
  // get_DataDepreciacion(idActivo: any):Observable<any>{//verificar en el backen si necesita parametro
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.get(this.url+"datadepreciacion/"+idActivo,{headers:headers});
  // }

  // get_altaEmpleado():Observable<any>{//verificar en el backen si necesita parametro
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.get(this.url+"empleadoalta",{headers:headers});
  // }
}
