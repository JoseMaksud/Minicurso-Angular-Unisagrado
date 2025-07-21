import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroinments';

@Injectable({
  providedIn: 'root'
})
export class UciDocenteAddService {

  private http = inject(HttpClient);

  postDocente(values: any): Observable<any>{
    return this.http.post(`${environment.API}/docente`, values);
  }
}
