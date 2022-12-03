import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TipoService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }


   get_tipoById(idTipo: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"tipoactivo/"+idTipo,{headers:headers});
  }
  insert_tipo(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'tipoactivo/registrar',data,{headers:headers});
  }

  update_tipo(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"tipoactivo/editar/"+data.idTipo,data,{headers:headers});
  }

  delete_tipo(idTipo: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'tipoactivo/elimina/'+idTipo,{headers:headers});
  }
}
