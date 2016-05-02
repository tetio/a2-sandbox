export interface ILorryMovement {
      camionOGrua: number,
      idMov: number,
      camion: string,
      transportistaNombre: string,
      contenedor: string,
      tipoContenedor: number,
      movimiento: string,
      llenoVacio: number,
      fecha: Date,
      ubicacion: string,
      mmpp: boolean,
      estado: string,
      descEstado: string,
      creadoManualmenteFlag: boolean,
      bTieneIncidencias: boolean,
 //     incidenciasKeys: String[]
}