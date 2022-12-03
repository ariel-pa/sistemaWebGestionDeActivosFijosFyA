import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_Altas(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"historial/altas/"+filtro,{headers:headers});
  }

  get_AltasCodigo(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"historial/altascod/"+filtro,{headers:headers});
  }

  get_Ufvs(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"historial/ufvs/"+filtro,{headers:headers});
  }

}
