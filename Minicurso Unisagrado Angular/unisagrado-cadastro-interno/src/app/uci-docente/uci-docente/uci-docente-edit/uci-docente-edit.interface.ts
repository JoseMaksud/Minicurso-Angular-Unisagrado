import { Observable } from "rxjs";

export interface IUciDocenteEdit{
    putDocente(idDocente: string, values: any): Observable<any>;
}