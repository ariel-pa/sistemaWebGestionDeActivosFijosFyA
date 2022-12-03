export class Activo{
    constructor(
        public idActivo: number,
        public idTipo: number,
        public Imagen: string,
        public Procedencia: string,
        public Descripcion: string,
        public ValorRegistro: number,
        public Observaciones: string,
        public idCondicion: number,
        public idRubro: number,
        public idProveedor: number,
    ){

    }
}