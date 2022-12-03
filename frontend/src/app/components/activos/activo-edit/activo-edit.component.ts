import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from 'src/app/services/activo.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UsuarioService } from 'src/app/services/usuario.service';

interface HtmlInputEvent extends Event{//Sirve para asiganar la imagen a la variable
  target : HTMLInputElement & EventTarget; 
}


@Component({
  selector: 'app-activo-edit',
  templateUrl: './activo-edit.component.html',
  styleUrls: ['./activo-edit.component.css']
})
export class ActivoEditComponent implements OnInit {
  public identity: any
  public activo: any;
  public idActivo: Number | any;
  public file: File | any;
  public factura: File | any;
  public imgSelect: String | ArrayBuffer | any;
  public facSelect: String | ArrayBuffer | any;
  public url: any;//Obtener la imagen anterior para editar

  public proveedores: any; //obtener las proveedor
  public rubros: any; //obtener las rubro
  public condiciones: any; //obtener las condicion
  public tipoactivo: any; //obtener el tipo de activo fijo
  public success_message: any;
  public error_message: any;

  constructor(
    private _activoService: ActivoService,
    private _route: ActivatedRoute,
    private _usarioService: UsuarioService,
    private _routes: Router,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      //Obtener el id 
      this._route.params.subscribe(params=>{
        this.idActivo= params['id'];//Se debe poner el id para recuperar del parametro
        this._activoService.get_activo(this.idActivo).subscribe(
          response=>{
            this.activo = response.activo[0];//
            // console.log(response);
            
            
            //Obtiene los proveedores
            this._activoService.get_Proveedores().subscribe(
              response=>{
                this.proveedores = response.proveedor;
              // console.log(this.proveedores);
              },
              error=>{

              }
            );
            //Obtiene los Rubros
            this._activoService.get_Rubros().subscribe(
              response=>{
                this.rubros = response.rubros;
                // console.log(this.rubros);
              },
              error=>{

              }
            );  

            //Obtiene las condiciones
            this._activoService.get_Condiciones().subscribe(
              response=>{
                this.condiciones = response.condicion;
                // console.log(this.condiciones);
              },
              error=>{
  
              }
            );

            //Obtiene el tipo de activo
            this._activoService.get_TipoActivo().subscribe(
              response=>{
                this.tipoactivo = response.tipoactivo;
                  // console.log(this.condiciones);
              },
              error=>{

              }
            );  

          },
          error=>{

          }
        )
      });
    }else{
      this._routes.navigate(['']);
    }

  }


  onSubmit(activoForm: any){
    if(activoForm.valid){
      // console.log(activoForm.value);
      // console.log(this.file);
      // console.log(this.activo.Imagen);
      this._activoService.update_activo({
        idActivo: this.idActivo,
        idTipo: activoForm.value.idTipo,
        Imagen: this.file, 
        // Factura: this.factura,
        Garantia: activoForm.value.Garantia,
        Procedencia: activoForm.value.Procedencia,
        Descripcion: activoForm.value.Descripcion,
        ValorRegistro: activoForm.value.ValorRegistro,
        Observaciones: activoForm.value.Observaciones,
        idCondicion: activoForm.value.idCondicion,
        idRubro: activoForm.value.idRubro,
        idProveedor: activoForm.value.idProveedor,
        img_name: this.activo.Imagen,
        // fac_name: this.activo.Factura,
      }).subscribe(
        response=>{
          // this.error_message = ''; 
          this.success_message = 'Activo actualizado correctamente.';
          // this.imgSelect = '../../../../assets/img/default.jpg';
          this.sleep(2000).then(() => this.success_message = '');  
        },
        error=>{

        }
      );
    }else{

      this.error_message = 'Complete el formulario';
      // this.success_message = '';
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

  success_alert(){
    this.success_message = ''; 
  }

  error_alert(){
    this.error_message = ''; 
  }
  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

}
