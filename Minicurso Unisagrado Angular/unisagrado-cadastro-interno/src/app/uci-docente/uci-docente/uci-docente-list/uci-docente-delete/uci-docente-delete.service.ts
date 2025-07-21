import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/enviroinments';

@Injectable({
  providedIn: 'root'
})

export class UciDocenteDeleteService {

  private http = inject(HttpClient);

  deleteDocente(id: string, status: string): Observable<any> {
    let params = {idDocente: id, statusDocente: status }
    return this.http.delete(`${environment.API}/docente`, {params});
  }
}
