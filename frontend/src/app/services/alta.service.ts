import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AltaService {

  public url:any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

   get_altaEmpleado():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"empleadoalta",{headers:headers});
  }

  getData_altaActivos(idAmbiente: any, filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"dataaltaactivo/"+idAmbiente+"/"+filtro,{headers:headers});
  }

  get_activosAlta(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"activosalta/"+filtro,{headers:headers});

  }

  get_ambiente():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"ambientes/",{headers:headers});

  }
  get_proyecto():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proyectos/",{headers:headers});

  }

  insert_altaActivo(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'altaactivo/registrar',data,{headers:headers});
  }


  get_QR(idAmbiente: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"altaactivo/pdfWithQr/"+idAmbiente,{headers:headers});
  }

  get_Altas(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"altas/"+filtro,{headers:headers});

  }

  get_AltasFiltroFecha(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"altasFecha/"+filtro,{headers:headers});

  }

  get_EdificioAmbienteById(idEdificio: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"edificio/ambiente/"+idEdificio,{headers:headers});
  }
}
