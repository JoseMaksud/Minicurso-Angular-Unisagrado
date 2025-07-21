import { Component, inject } from '@angular/core';
import { UciDocenteFormsComponent } from "../uci-docente-forms/uci-docente-forms.component";
import { IUciDocenteAdd } from './uci-docente-add.interface';
import { UciDocenteAddService } from './uci-docente-add.service';
import { MessageService } from 'primeng/api';
import { catchError, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-uci-docente-add',
  imports: [UciDocenteFormsComponent, ToastModule],
  template: `
    <div class="uci-docente-add-component">
      <app-uci-docente-forms (onSubmit)="postDocente($event)" />
    </div>
    <p-toast></p-toast>
  `,
  styles: ``
})
export class UciDocenteAddComponent {
  private docenteAddService: IUciDocenteAdd = inject(UciDocenteAddService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  async postDocente(values: any){
    await lastValueFrom(this.docenteAddService.postDocente(values).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar docente ' + error.error.message })
        return error;
      })
    ));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Docente cadastrado!' });

    setTimeout(() => {
      this.router.navigate(['/docentes']);
    }, 400);
  }
}
