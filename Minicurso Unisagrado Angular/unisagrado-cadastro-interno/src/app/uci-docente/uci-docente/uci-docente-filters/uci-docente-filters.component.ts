import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IDocenteFilters } from './uci-docente-filters.interface';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-uci-docente-filters',
  imports: [CommonModule, InputTextModule, SelectButtonModule, ButtonModule, InputSwitchModule, DatePickerModule, FormsModule],
  template: `
    <div class="docente-filter" (keydown.enter)="onFilter.emit(filters)">
      <div class="filters">
        <div class="filtro">
          <div class="filter-name">
            <span>Nome</span>
          </div>
          <input [style]="{'width': '60%'}" type="text" pInputText [(ngModel)]="filters.usu_no_usuario">
        </div>

        <div class="filtro">
          <div class="filter-name">
            <span>Email</span>
          </div>
          <input [style]="{'width': '60%'}" type="text" pInputText [(ngModel)]="filters.usu_no_email">
        </div>

        <div class="filtro">
          <div class="filter-name">
            <span>Status</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; ">
            <p-selectbutton [options]="statusOptions" [(ngModel)]="filters.usu_in_status" optionLabel="label" optionValue="value" />
          </div>
        </div>
      </div>

      <div class="filters">
        <div class="filtro">
          <div class="filter-name">
            <span>CPF</span>
          </div>
          <input [style]="{'width': '60%'}" type="text" pInputText [(ngModel)]="filters.usu_co_cpf">
        </div>

        <div class="filtro">
          <div class="filter-name">
            <span>Data Cadastro</span>
          </div>
          <div class="date-picker-filter" style="display: flex; align-items:center; width: 60%">
            <p-datepicker [style]="{'width': '100%'}" [(ngModel)]="filters.usu_dt_cadastro" selectionMode="range" [readonlyInput]="true" />
          </div>
        </div>

        <div class="filtro">
          <div class="filter-name">
            <span>Posição</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; ">
            <p-selectbutton [options]="posicaoOptions" [(ngModel)]="filters.usu_in_tipo" optionLabel="label" optionValue="value" />
          </div>
        </div>
      </div>
    </div>

    <div class="button-pesquisar" style="display: flex; align-items: center; padding: 0px 20px">
      <p-button size="small" severity="info" label="Pesquisar" (click)="onFilter.emit(filters)" icon="pi pi-filter"></p-button>
      <p-button variant="outlined" severity="info" [style]="{'margin-left':'15px'}" size="small" label="Limpar" icon="pi pi-filter-slash" (click)="clear()"></p-button>
      <div class="filtro" style="justify-content: end;">
        <p-button icon="pi pi-plus" severity="info" [rounded]="true" (click)="router.navigate(['/docentes/cadastro'])"></p-button>
      </div>
    </div>
  `,
  styles: `
    ::ng-deep p-inputmask.p-element.filter-cnpj-cadastro{
      width:60%
    }
    
    ::ng-deep .date-picker-filter > p-datepicker {
      width: 100%;
    }


    .wfull {
      width: 100%!important;
    }

    .docente-filter{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
    }

    .filtro{
      display: flex;
      padding: 10px;
      width: 100%
    }

    .filters{
      width: 45%;
      margin-bottom: auto;
    }

    .filter-name{
      display: flex;
      background-color: #ddd;
      padding: 10px 20px 10px 20px;
      align-items: center;
      width: 35%;
      justify-content: center;
      border-radius: 5px 0px 0px 5px;
    }

    .j-center {
      justify-content: center;
    }

    @media (max-width: 1100px) {
      .docente-filter{
        flex-wrap: wrap
      }
      .filters{
        width: 90% !important;
      }
      .j-center {
        justify-content: normal;
      }
    }

  `
})
export class UciDocenteFiltersComponent {
  @Input() filters!: IDocenteFilters;
  @Output() onFilter = new EventEmitter();
  protected router = inject(Router);

  

  statusCadastro: boolean = false;

  statusOptions = [
    {
      label: 'Ativo',
      value: 'A'
    },
    {
      label: 'Inativo',
      value: 'I'
    },
    {
      label: 'Todos',
      value: 'T'
    }
  ];

  posicaoOptions = [
    {
      label: 'Diretor',
      value: 'D'
    },
    {
      label: 'Coodenador',
      value: 'C'
    },
    {
      label: 'Professor',
      value: 'P'
    },
    {
      label: 'Todos',
      value: 'T'
    }
  ]

  clear(){
    this.onFilter.emit({usu_in_status: 'T', usu_in_tipo: 'T'} as IDocenteFilters);
  }
}
