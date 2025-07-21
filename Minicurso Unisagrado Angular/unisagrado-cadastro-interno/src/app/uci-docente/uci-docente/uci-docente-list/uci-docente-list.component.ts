import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IDocenteModel } from '../uci-docente.interface';
import { ButtonModule } from 'primeng/button';
import { UciDocentePaginatorComponent } from "./uci-docente-paginator/uci-docente-paginator.component";
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from "../../../pipes/cpf-format.pipe";
import { UciDocenteDeleteComponent } from "./uci-docente-delete/uci-docente-delete.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-uci-docente-list',
  imports: [CommonModule, TableModule, ButtonModule, UciDocentePaginatorComponent, CpfFormatPipe, UciDocenteDeleteComponent],
  template: `
    <div class="uci-docente-list-component">
      <div class="uci-docente-list-title">
        <span>Docentes</span>
      </div>

      <div class="uci-docente-list">
        <p-table [loading]="loading" [value]="docentes" [tableStyle]="{ 'min-width': '100%' }">
            <ng-template #header>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Posição</th>
                    <th>Status</th>
                    <th style="text-align: center">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-docente>
                <tr>
                    <td>{{ docente.usu_no_usuario }}</td>
                    <td>{{ docente.usu_co_cpf | cpfFormat }}</td>
                    <td>{{ docente.usu_no_email }}</td>
                    <td>{{ docente.usu_in_tipo == 'D'? 'Diretor(a)' : docente.usu_in_tipo == 'C'? 'Coordenador(a)' : 'Professor(a)' }}</td>
                    <td>{{ docente.usu_in_status == 'A'? 'Ativo' : 'Inativo'}}</td>
                    <td style="display: flex; justify-content: center">
                      <p-button [style]="{'margin-right': '10px'}" [rounded]="true" [severity]="'warn'" icon="pi pi-pencil" (click)="router.navigate(['/docentes/editar/'+docente.usu_co_usuario], {state: { docente }})"></p-button>
                      <app-uci-docente-delete (onDeleteDocente)="this.onPageChange.emit({rows: rows, first: first})" [status]="docente.usu_in_status" [id]="docente.usu_co_usuario" />
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="5">Nenhum registro encontrado</td>
                </tr>
            </ng-template>
        </p-table>
        <div class="uci-docente-paginator">
          <app-uci-docente-paginator (onPageChangeEvent)="this.onPageChange.emit($event)" [rows]="rows" [first]="first" [totalRecords]="totalRecords"  />
        </div>
      </div>
    </div>
  `,
  styles: `
    .uci-docente-list-component,
    .uci-docente-list-title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .uci-docente-list-title{
      background-color: red;
      color: white;
      width: 100%;
    }

    .uci-docente-list{
      width: 100%;
    }

    .uci-docente-list-title > span {
      font-size: 22px;
      letter-spacing: 2px;
    }

  `
})
export class UciDocenteListComponent {
  
  @Input() docentes: IDocenteModel[] = [];

  @Input() rows!: number;
  @Input() first!: number;
  @Input() totalRecords!: number;

  @Output() onPageChange = new EventEmitter();
  
  @Input() loading: boolean = false;

  protected router = inject(Router);
}
