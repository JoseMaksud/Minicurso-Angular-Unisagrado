import { Observable } from "rxjs";
import { IDocenteModel } from "../uci-docente/uci-docente/uci-docente.interface";

export interface INavBar{
    getUser(id: string): Observable<IDocenteModel>;
}