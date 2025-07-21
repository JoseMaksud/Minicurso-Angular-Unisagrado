import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UciDocenteListComponent } from "./uci-docente-list/uci-docente-list.component";
import { UciDocenteFiltersComponent } from "./uci-docente-filters/uci-docente-filters.component";
import { IDocenteModel, IDocenteService } from './uci-docente.interface';
import { catchError, filter, lastValueFrom } from 'rxjs';
import { UciDocenteService } from './uci-docente.service';
import { IDocenteFilters } from './uci-docente-filters/uci-docente-filters.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-uci-docente',
  imports: [CommonModule, ButtonModule, UciDocenteListComponent, UciDocenteFiltersComponent, ToastModule],
  template: `
    <div class="uci-docente-component">
      <div class="uci-docente-nav">
        <p-button (click)="router.navigate(['/home'])" [rounded]="true" severity="danger" icon="pi pi-chevron-left" label="Voltar"  ></p-button>
        <span>-</span>
        <span>Portal Docentes</span>
      </div>

      <div class="uci-docente-filter">
        <app-uci-docente-filters (onFilter)="getDocentes(first, rows, $event)" [filters]="filters" />
      </div>

      <div class="uci-docente-buttons"></div>

      <div class="uci-docente-list">
        <app-uci-docente-list [loading]="loading" (onPageChange)="getDocentes($event.first, $event.rows, filters)" [totalRecords]="total_records" [first]="first" [rows]="rows" [docentes]="docentes" />
      </div>
    </div>
    <p-toast></p-toast>
  `,
  styles: `
    .uci-docente-nav{
      width: 100%;
      display: flex;
      align-items: center;
      height: 100px;
      padding: 25px;
    }

    .uci-docente-nav > span{
      font-size: 25px;
      margin-left: 20px;
    }

    .uci-docente-list{
      width: 100%;
    }
  `
})
export class UciDocenteComponent implements OnInit {
  protected router = inject(Router);
  private docenteService: IDocenteService = inject(UciDocenteService);
  private messageService = inject(MessageService);


  docentes: IDocenteModel[] = [];
  
  first: number = 0;
  rows: number = 10;
  total_records: number = 0;
  filters: IDocenteFilters = {usu_in_status: 'A', usu_in_tipo: 'T' } as IDocenteFilters
  loading: boolean = false;

  async ngOnInit() {
    await this.getDocentes(this.first, this.rows, this.filters);
  }

  async getDocentes(first: number, rows: number, filters: IDocenteFilters){
    this.loading = true;
    const docentes: any = await lastValueFrom(this.docenteService.getDocente(first, rows, filters).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar docentes ' + error.error.message })
        return error;
      })
    ));
    this.docentes = docentes;
    this.filters = filters;
    if(docentes.length > 0) {
      this.total_records = docentes[0].total_records;
    }
    this.loading = false;
  }
}
