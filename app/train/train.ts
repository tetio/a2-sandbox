import { TermintResult } from '../common/TermintResult';

export interface ITrain {
    servicio: string,
    fechaOficialSalida: string
}

export class ITrainService {
    codigo: string;
    descripcion: string;

    value(): string {
        return this.codigo;
    }
    label(): string {
        return this.descripcion;
    }
}

export interface ITrainServicesResponse extends TermintResult {
    lista: ITrainService[];
}

export interface ITrainQueryResponse extends TermintResult {
    trains: ITrain[];
}
