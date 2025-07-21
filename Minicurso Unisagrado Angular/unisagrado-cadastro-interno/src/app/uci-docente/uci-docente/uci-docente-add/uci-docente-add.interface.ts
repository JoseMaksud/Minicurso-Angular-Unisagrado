import { Observable } from "rxjs";

export interface IUciDocenteAdd{
    postDocente(values: any): Observable<any>
}