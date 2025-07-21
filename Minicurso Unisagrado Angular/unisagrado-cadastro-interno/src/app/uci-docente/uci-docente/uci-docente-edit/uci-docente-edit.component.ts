import { Component, inject, Input, OnInit } from '@angular/core';
import { IDocenteModel } from '../uci-docente.interface';
import { CommonModule } from '@angular/common';
import { UciDocenteFormsComponent } from "../uci-docente-forms/uci-docente-forms.component";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUciDocenteEdit } from './uci-docente-edit.interface';
import { UciDocenteEditService } from './uci-docente-edit.service';
import { catchError, lastValueFrom } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-uci-docente-edit',
  imports: [CommonModule, UciDocenteFormsComponent, ToastModule],
  template: `
    <div class="uci-docente-edit-component">
      <app-uci-docente-forms [docente]="docente" (onSubmit)="putDocente($event)" />
    </div>
    <p-toast></p-toast>
  `,
  styles: `
    
  `
})
export class UciDocenteEditComponent implements OnInit {
  docente!: IDocenteModel;
  
  private messageService = inject(MessageService);
  private docenteEditService: IUciDocenteEdit = inject(UciDocenteEditService);
  private router = inject(Router);

  
  ngOnInit(): void {
    if(history.state?.docente !== undefined){
      this.docente = history.state.docente
    }else{
      this.router.navigate(['/docentes'])
    }
  }

  async putDocente(values: any){
    await lastValueFrom(this.docenteEditService.putDocente(values.usu_co_usuario, values).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar docente ' + error.error.message })
        return error;
      })
    ));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Docente Alterado!' });

    setTimeout(() => {
      this.router.navigate(['/docentes']);
    }, 400);
  }
}
