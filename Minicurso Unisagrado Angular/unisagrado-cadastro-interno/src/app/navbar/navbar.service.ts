import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocenteModel } from '../uci-docente/uci-docente/uci-docente.interface';
import { environment } from '../../environments/enviroinments';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private http = inject(HttpClient);

  getUser(id: string): Observable<IDocenteModel>{
    return this.http.get<IDocenteModel>(`${environment.API}/docente/user`);
  }
  
}
