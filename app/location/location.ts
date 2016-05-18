export class ILocation {
    zona: string;
    nombre: string;

    value(): string {
        return this.zona;
    }
    label(): string {
        return this.nombre;
    }
}
