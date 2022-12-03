import { Injectable } from '@angular/core';
import { Observable } from "rxjs";//
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { GLOBAL } from "./GLOBAL";//


@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  public url: any;
  
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }


  get_activos(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"activos/"+filtro,{headers:headers});

  }

  get_Proveedores():Observable<any>{//Obtener Proveedores
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proveedores/",{headers:headers});
  }

  get_Rubros():Observable<any>{//obtener Rubros
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"rubros/",{headers:headers});
  }

  get_Condiciones():Observable<any>{//Obtener Condiciones
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"condiciones/",{headers:headers});
  }

  get_TipoActivo():Observable<any>{//Obtener Condiciones
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"tipoactivos/",{headers:headers});
  }

  insert_activo(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idTipo',data.idTipo);
    fd.append('Imagen',data.Imagen);
    fd.append('Factura',data.Factura);
    fd.append('Garantia',data.Garantia);
    fd.append('Procedencia',data.Procedencia);
    fd.append('Descripcion',data.Descripcion);
    fd.append('ValorRegistro',data.ValorRegistro);
    fd.append('UfvInicial',data.UfvInicial);
    fd.append('Observaciones',data.Observaciones);
    fd.append('idCondicion',data.idCondicion);
    fd.append('idRubro',data.idRubro);
    fd.append('idProveedor',data.idProveedor);

    return this._http.post(this.url + 'activo/registrar',fd);
  }
  //Obtener activos por id para editar
  get_activo(idActivo: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"activo/"+idActivo,{headers:headers});

  }
  //editar activo
  update_activo(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idTipo',data.idTipo);
    fd.append('Imagen',data.Imagen);
    // fd.append('Factura',data.Factura);
    fd.append('Garantia',data.Garantia);
    fd.append('Procedencia',data.Procedencia);
    fd.append('Descripcion',data.Descripcion);
    fd.append('ValorRegistro',data.ValorRegistro);
    fd.append('Observaciones',data.Observaciones);
    fd.append('idCondicion',data.idCondicion);
    fd.append('idRubro',data.idRubro);
    fd.append('idProveedor',data.idProveedor);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'activo/editar/'+data.idActivo+'/'+data.img_name,fd);
  }

  insert_proveedor(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'proveedor/registrar',data,{headers:headers});
  }

  insert_tipoactivo(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'tipoactivo/registrar',data,{headers:headers});
  }


  deltete_activo(idActivo: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'activo/eliminar/'+idActivo,{headers:headers});
  }

  deltete_tipoactivo(idTipo: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'tipoactivo/eliminar/'+idTipo,{headers:headers});
  }
  // get_tipoactivoId(idTipo: any):Observable<any>{//verificar en el backen si necesita parametro
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.get(this.url+"tipoactivo/"+idTipo,{headers:headers});

  // }
}
