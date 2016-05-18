import { TermintResult } from '../common/TermintResult';

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


export interface ILocationsResponse extends TermintResult {
    lista: ILocation[];
}