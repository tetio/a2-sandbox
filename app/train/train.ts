import { TermintResult } from '../common/TermintResult';

export interface ITrain {
    servicio: string,
    fechaOficialSalida: string,
    fechaRealLlegada: string,
    idTren: string,
    operacion: string,
    fos: Date
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


export interface ITrainEquip {
	idTren: number,
	idEquipo: number,	
	numAutorizacion: string,
	matricula: string,
	tipo: string,
	llenoVacio: string,
	ubicacionExplanada: string,
	ubicacionTren: string,
}

export interface ITrainServicesResponse extends TermintResult {
    lista: ITrainService[];
}

export interface ITrainQueryResponse extends TermintResult {
    trains: ITrain[];
}

export interface ITrainEquipsResponse extends TermintResult {
    lista: ITrainEquip[];
}
