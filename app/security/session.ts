export interface ISession {
  token: string,
  nomUsuari: string,
  usuari: string,
  nomEmpresa: string,
  nif: string,
  pais: string,
  aplicacions: string[],    
  serveis: string[],
  dataCreacio: Date,
  tfnEmpresa: string,
  idAviso: number,
  codiError: number,
  missatgeCurtError: string  
}