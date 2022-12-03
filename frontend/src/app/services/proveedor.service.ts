import { Injectable } from '@angular/core';

import { Observable } from "rxjs";//
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { GLOBAL } from "./GLOBAL";//

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  public url: any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_proveedor(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proveedores/"+filtro,{headers:headers});
  }

  insert_proveedor(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'proveedor/registrar',data,{headers:headers});
  }

  get_proveedorById(idProveedor: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proveedor/"+idProveedor,{headers:headers});
  }

  update_proveedor(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"proveedor/editar/"+data.idProveedor,data,{headers:headers});
  }
  delete_proveedor(idProveedor: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'proveedor/eliminar/'+idProveedor,{headers:headers});
  }

}
