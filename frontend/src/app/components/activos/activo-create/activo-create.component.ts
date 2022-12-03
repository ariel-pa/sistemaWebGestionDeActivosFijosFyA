import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivoService } from 'src/app/services/activo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Activo } from "../../../models/Activo";//

interface HtmlInputEvent extends Event{//Sirve para asiganar la imagen a la variable
  target : HTMLInputElement & EventTarget; 
}

@Component({
  selector: 'app-activo-create',
  templateUrl: './activo-create.component.html',
  styleUrls: ['./activo-create.component.css']
})
export class ActivoCreateComponent implements OnInit {
  public identity: any
  public activo: any;
  public file: File | any;
  public factura: File | any;
  public imgSelect: String | ArrayBuffer | any;
  public facSelect: String | ArrayBuffer | any;

  public proveedores: any; //obtener las proveedor
  public rubros: any; //obtener las rubro
  public condiciones: any; //obtener las condicion
  public tipoactivo: any; //obtener el tipo de activo fijo
  public success_message: any;
  public error_message: any;
  public imagen_name: any;

  constructor(
    private _activoService: ActivoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
  }

  ngOnInit(): void {
    if(this.identity){
      //Obtiene los proveedores
      this._activoService.get_Proveedores().subscribe(
        response=>{
          this.proveedores = response.proveedor;
          // console.log(this.proveedores);
        },
        error=>{

        }
      )
      //Obtiene los Rubros
      this._activoService.get_Rubros().subscribe(
        response=>{
          this.rubros = response.rubros;
          // console.log(this.rubros);
        },
        error=>{

        }
      )

      //Obtiene las condiciones
      this._activoService.get_Condiciones().subscribe(
        response=>{
          this.condiciones = response.condicion;
          // console.log(this.condiciones);
        },
        error=>{

        }
      )

      //Obtiene las condiciones
      this._activoService.get_TipoActivo().subscribe(
        response=>{
          this.tipoactivo = response.tipoactivo;
          // console.log(this.condiciones);
        },
        error=>{

        }
      )
    }else{
      this._route.navigate(['']);
    }


  }

  success_alert(){
    this.success_message = ''; 
  }

  error_alert(){
    this.error_message = ''; 
  }

  onSubmit(activoForm: any){
    if(activoForm.valid){
      // console.log(this.file,"----",this.factura);
      this._activoService.insert_activo({
        idTipo: activoForm.value.idTipo,
        Imagen: this.file,
        Factura: this.factura,
        Garantia: activoForm.value.Garantia,
        Procedencia: activoForm.value.Procedencia,
        Descripcion: activoForm.value.Descripcion,
        ValorRegistro: activoForm.value.ValorRegistro,
        Observaciones: activoForm.value.Observaciones,
        UfvInicial: activoForm.value.UfvInicial,
        idCondicion: activoForm.value.idCondicion,
        idRubro: activoForm.value.idRubro,
        idProveedor: activoForm.value.idProveedor,
      }).subscribe(
        response=>{
          this.error_message = ''; 
          this.success_message = 'Activo registrado correctamente.';
          this.activo = new Activo(1,1,'','','',1,'',1,1,1);
          this.imgSelect = '../../../../assets/img/default.jpg';
          this.sleep(2000).then(() => this.success_message = '');  
        },
        error=>{

        }
      )
    }else{

      this.error_message = 'Complete el formulario';
      this.success_message = '';
      this.sleep(2000).then(() => this.error_message = '');
      // console.log("Error en el formulario")
    }
  }

  imgSelected(event: HtmlInputEvent | any){
    if(event.target.files  && event.target.files[0]){//verificar si hay imagen
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelect= reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  facSelected(event: HtmlInputEvent | any){
    if(event.target.files  && event.target.files[0]){//verificar si hay imagen
      this.factura = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.facSelect= reader.result;
      reader.readAsDataURL(this.factura);
    }
  }

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

}
