import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_ambientes(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"ambientes/"+filtro,{headers:headers});
  }

  insert_ambiente(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'ambiente/registrar',data,{headers:headers});
  }

  get_ambienteById(idAmbiente: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"ambiente/"+idAmbiente,{headers:headers});
  }

  update_ambiente(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"ambiente/editar/"+data.idAmbiente,data,{headers:headers});
  }

  delete_ambiente(idAmbiente: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'ambiente/eliminar/'+idAmbiente,{headers:headers});
  }

}
