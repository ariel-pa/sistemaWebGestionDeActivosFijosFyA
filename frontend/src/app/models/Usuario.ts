export class Usuario{
    constructor(
        public idUsuario: string,
        public idEmplead: number,
        public Nombres: string,
        public Apellidos: string,
        public Email: string,
        public Password: string,
        public Rol: string,
        public Estado: string
    ){

    }
}