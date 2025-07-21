import { Observable } from "rxjs";

export interface IUciDocenteDeleteService {

    deleteDocente(id: string, status: string): Observable<any>;
}