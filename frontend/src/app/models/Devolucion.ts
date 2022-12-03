export class Devolucion{
    constructor(
        public idDevolucion: number,
        public CodActivo: number,
        public CodEmpleado: number,
        public idCondici: number,
        public Motivo: string,
        public FechaDevolucion: string,
        public Proyecto: string,
        public Observaciones: string,
    ){

    }
}