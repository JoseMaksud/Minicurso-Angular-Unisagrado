import { Observable } from "rxjs";
import { IDocenteFilters } from "./uci-docente-filters/uci-docente-filters.interface";

export interface IDocenteModel{
    usu_co_usuario: string;
    usu_no_usuario: string;
    usu_co_cpf: string;
    usu_no_email: string;
    usu_nu_telefone: string;
    usu_in_status: string;
    usu_in_tipo: string;
    usu_dt_nascimento: string;
    usu_dt_ultima_alteracao: string;
    usu_dt_cadastro: string;
    usu_co_usuario_alteracao: string;
    total_records: number;
}

export interface IDocenteService {
    getDocente(first: number, rows: number, filters: IDocenteFilters): Observable<IDocenteModel[]>;
}