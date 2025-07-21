import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroinments';

@Injectable({
  providedIn: 'root'
})
export class UciDocenteEditService {

  private http = inject(HttpClient);
  
  putDocente(idDocente: string, values: any): Observable<any>{
    return this.http.put<any>(`${environment.API}/docente/${idDocente}`, values);
  }

}
