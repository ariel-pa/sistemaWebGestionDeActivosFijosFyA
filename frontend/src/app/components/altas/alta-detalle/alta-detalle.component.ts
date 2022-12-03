import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AltaService } from 'src/app/services/alta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { jsPDF } from 'jspdf'; //libreria de pdf
import * as printJS from 'print-js';
import { GLOBAL } from '../../../services/GLOBAL'; //

@Component({
  selector: 'app-alta-detalle',
  templateUrl: './alta-detalle.component.html',
  styleUrls: ['./alta-detalle.component.css'],
})
export class AltaDetalleComponent implements OnInit {
  public idAmbiente: any;
  public altaactivos: any;
  public empleado: any = {
    idAmbiente: '',
  };
  public filtroText: any;
  public identity: any;
  public pdf: HTMLElement | null | any;
  public teamJSON: JSON | any;
  public url: any;
  p: number = 1;
  constructor(
    private _routes: Router,
    private _route: ActivatedRoute,
    private _altaService: AltaService,
    private _usarioService: UsuarioService
  ) {
    this.identity = this._usarioService.getIdentity();
    this.url = GLOBAL.url;
  }

  imprimirLista() {

    printJS({
      font_size: '40pt',
      headerStyle: 'font-weight: 300;',
      documentTitle: '_',
      header:
        '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>REPORTE DE ACTIVOS FIJOS ASIGNADOS</p></b></center><p><b>Ambiente:</b> ' +
        this.empleado.NombreAmb +
        '<br><b>Responsable:</b> ' +
        this.empleado.Nombres +
        ' ' +
        this.empleado.Apellidos +
        '<br><b>Cargo:</b> ' +
        this.empleado.Cargo +
        '<p/><p>Listado de activos fijos:<p/><div style="position: absolute; bottom:100px; left:30px; display:flex"><p style="width:450px">Entrege conforme:</p><p>Recibi conforme:</p></div>',
      // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt="">',
      printable: this.altaactivos,
      type: 'json',
      // repeatTableHeader:true,
      properties: [
        { field: 'Codificacion', displayName: 'Codificación' },
        { field: 'NombreActivo', displayName: 'Tipo' },
        { field: 'Descripcion', displayName: 'Descripción' },
        { field: 'Nombre', displayName: 'Condición' },
        // {field:'Procedencia', displayName: 'Procedencia'},
        { field: 'Observaciones', displayName: 'Observaciones' },
        // {field:'NombrePro', displayName: 'Proyecto'}
      ],

      style: '.custom-h3 { color: red;} .mi-div{height: 150px; !important}',
      gridHeaderStyle: ' background:blue; border: 2px solid black; ', //caberesera
      gridStyle: 'border: 1px solid black; ', //contenido,
    });

    // const doc = new jsPDF('p', 'pt', 'letter');
    // this.pdf= document.getElementById('listapdf');
    // doc.html(this.pdf, {
    //   margin:[40,60,40,60],
    //   callback: function(doc) {
    //     doc.save("Detalles.pdf");
    //   }
    // });
  }

  search(searchForm: any) {
    this._route.params.subscribe((params) => {
      this.idAmbiente = params['id'];
      this._altaService
        .getData_altaActivos(this.idAmbiente, searchForm.value.filtroText)
        .subscribe(
          (res) => {
            this.altaactivos = res.altaactivos;
            this.empleado = res.empleado[0];
            this.teamJSON = res.altaactivos;
            // console.log("json",this.teamJSON);
          },
          (err) => {}
        );
    });
  }
  ngOnInit(): void {
    if (this.identity) {
      this._route.params.subscribe((params) => {
        this.idAmbiente = params['id'];
        this._altaService.getData_altaActivos(this.idAmbiente, '').subscribe(
          (res) => {
            this.altaactivos = res.altaactivos;
            console.log(this.altaactivos);
            this.empleado = res.empleado[0];
            this.teamJSON = res.altaactivos;
            // console.log("json",this.teamJSON);
          },
          (err) => {}
        );
      });
    } else {
      this._routes.navigate(['']);
    }
  }

  // print(){
  //   printJS({
  //     printable: this.teamJSON,
  //     type: 'json',
  //     properties: ['Codificacion', 'idActivo', 'NombreActivo', 'Nombre','hola'],
  //     header: '<h3 class="custom-h3"></h3>',
  //     style: '.custom-h3 { color: red; }'
  //     })
  // }

  imprimirQR(idAmbiente: any) {
    // console.log(idAmbiente);
    window.location.href = `${GLOBAL.url}altaactivo/pdfWithQr/${idAmbiente}`;
  }
}
