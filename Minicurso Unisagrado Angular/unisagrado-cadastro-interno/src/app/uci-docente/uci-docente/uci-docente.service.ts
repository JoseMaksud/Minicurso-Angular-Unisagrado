import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDocenteFilters } from './uci-docente-filters/uci-docente-filters.interface';
import { Observable } from 'rxjs';
import { IDocenteModel } from './uci-docente.interface';
import { environment } from '../../../environments/enviroinments';

@Injectable({
  providedIn: 'root'
})
export class UciDocenteService {

  private http = inject(HttpClient);


  getDocente(first: number, rows: number, filters: IDocenteFilters): Observable<IDocenteModel[]>{
    let params = new HttpParams()
    .set('first', first.toString())
    .set('rows', rows.toString())
    .set('nome', filters.usu_no_usuario ?? '')
    .set('cpf', filters.usu_co_cpf ?? '')
    .set('email', filters.usu_no_email ?? '')
    .set('status', filters.usu_in_status ?? '')
    .set('tipo', filters.usu_in_tipo ?? '')
    .set('dt_cadastro', JSON.stringify(filters.usu_dt_cadastro) ?? '')

    return this.http.get<IDocenteModel[]>(`${environment.API}/docente`, { params });
  }

}
