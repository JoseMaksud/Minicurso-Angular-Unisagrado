import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { catchError, lastValueFrom } from 'rxjs';
import { IUciDocenteDeleteService } from './uci-docente-delete.interface';
import { UciDocenteDeleteService } from './uci-docente-delete.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-uci-docente-delete',
  imports: [ButtonModule],
  template: `
    <div class="uci-docente-delete-component">
      <p-button [severity]="status == 'A'? 'danger': 'help'" (click)="deleteDocente(id, status)" [rounded]="true" [icon]="status == 'A'? 'pi pi-trash': 'pi pi-refresh'"></p-button>
    </div>
  `,
  styles: `
  
  `
})
export class UciDocenteDeleteComponent {
  @Input() id!: string;
  @Input() status!: string;
  @Output() onDeleteDocente = new EventEmitter();

  private deleteDocenteService: IUciDocenteDeleteService = inject(UciDocenteDeleteService);
  private messageService = inject(MessageService);

  async deleteDocente(id: string, status: string){
    await lastValueFrom(this.deleteDocenteService.deleteDocente(id, status).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar docente ' + error.error.message })
        return error;
      })
    ));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Docente deletado!' });
    this.onDeleteDocente.emit();
  }
}
