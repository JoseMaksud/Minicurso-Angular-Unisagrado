import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ErroFormComponent } from "./uci-docente-erro/erro-form.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Router } from '@angular/router';
import { IDocenteModel } from '../uci-docente.interface';

@Component({
  selector: 'app-uci-docente-forms',
  imports: [CommonModule, SelectButtonModule, ButtonModule, DatePickerModule, ErroFormComponent, ReactiveFormsModule, FormsModule, InputMaskModule, InputTextModule],
  template: `
      <div class="uci-docente-nav">
        <p-button (click)="router.navigate(['/docentes'])" [rounded]="true" severity="danger" icon="pi pi-chevron-left" label="Voltar"  ></p-button>
        <span>-</span>
        <span>Cadastro Docente</span>
      </div>
    <div class="uci-docente-forms">
      <form [formGroup]="formulario" style="width: 90%; border: 1px solid #ddd; border-radius: 10px; padding: 15px">
        <div class="uci-form-group">
          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>Nome:</span>
              </div>
              <div class="uci-input">
                <input placeholder="Nome do docente" formControlName="usu_no_usuario" type="text" pInputText>
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Telefone inválido!'" [nameField]="'usu_no_usuario'"/>
          </div>

          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>CPF:</span>
              </div>
              <div class="uci-input">
                <p-inputMask [style]="{'width':'100%'}" class="uci-input-mask" formControlName="usu_co_cpf"  mask="999.999.999-99" type="text" placeholder="999.999.999-99" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'CPF inválido!'" [nameField]="'usu_co_cpf'"/>
          </div>
        </div>

        <div class="uci-form-group">
          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>Email:</span>
              </div>
              <div class="uci-input">
                <input placeholder="Email institucional" formControlName="usu_no_email" type="text" pInputText>
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Email inválido!'" [nameField]="'usu_no_email'"/>
          </div>

          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>Telefone:</span>
              </div>
              <div class="uci-input">
                <p-inputMask [style]="{'width':'100%'}" class="uci-input-mask" formControlName="usu_nu_telefone"  mask="(99) 99999-9999" type="text" placeholder="(99) 99999-9999" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Telefone inválido!'" [nameField]="'usu_nu_telefone'"/>
          </div>
        </div>

        <div class="uci-form-group">
          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label" style="width: 35%;">
                <span>Data de nascimento:</span>
              </div>
              <div class="uci-input" style="width: 65%">
                <p-datepicker [style]="{'width': '100%'}" formControlName="usu_dt_nascimento" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Data inválida!'" [nameField]="'usu_dt_nascimento'"/>
          </div>

          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label" style="width: 35%;">
                <span>Data de Admissão:</span>
              </div>
              <div class="uci-input" style="width: 65%;">
                <p-datepicker [style]="{'width': '100%'}" formControlName="usu_dt_cadastro" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Data inválida!'" [nameField]="'usu_dt_cadastro'"/>
          </div>
        </div>

        <div class="uci-form-group">
          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>Status:</span>
              </div>
              <div class="uci-input">
                <p-selectbutton [options]="statusOptions" formControlName="usu_in_status" optionLabel="label" optionValue="value" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Selecione um status!'" [nameField]="'usu_in_status'"/>
          </div>

          <div class="uci-group" style="width: 47%;">
            <div class="uci-field">
              <div class="uci-label">
                <span>Posição:</span>
              </div>
              <div class="uci-input">
                <p-selectbutton [options]="posicaoOptions" formControlName="usu_in_tipo" optionLabel="label" optionValue="value" />
              </div>
            </div>
            <app-erro-form  [formulario]="formulario" [errorText]="'Selecione uma posição!'" [nameField]="'usu_in_tipo'"/>
          </div>
        </div>
      </form>
      <div class="uci-buttons-form" style="display: flex; justify-content: space-between; margin: 20px 0px; width: 90%">
        <p-button label="Cancelar" icon="pi pi-times" severity="danger" (click)="router.navigate(['/docentes'])"></p-button>
        <p-button label="Limpar" icon="pi pi-trash" severity="warn" (click)="formulario.reset()"></p-button>
        <p-button label="Enviar" icon="pi pi-check" severity="success" (click)="submitForm()"></p-button>
      </div>
    </div>
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

    .uci-docente-forms{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .uci-field{
        display: flex;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
      }

      .input-label-file{
        display: flex;
        flex-direction: column;
      }

      .input-label-file > small {
        color: #8a8a8a
      }

      .uci-group{
        display: flex;
        flex-direction: column;
      }

      .uci-input{
        width: 80%;
      }

      .uci-input > input{
        width: 100%
      }
      
      
      .uci-form-group{
        display: flex;
        margin: 15px 0px;
        justify-content: space-between;
      }

      .uci-label{
        background-color: #ddd;
        border-radius:  5px;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        width: 20%;
        height: 100%;
      }

      ::ng-deep .uci-buttons-form > p-button > button{
        width: 100%;
      }

      ::ng-deep .uci-buttons-form > p-button:nth-of-type(1){
        width: 22%
      }
  
      ::ng-deep .uci-buttons-form > p-button:nth-of-type(2){
        width: 28%
      }

      ::ng-deep .uci-buttons-form > p-button:nth-of-type(3){
        width: 42%
      }


      @media (max-width: 1338px) {
        .uci-form-group{
          flex-wrap: wrap;
        }

        .uci-group{
          width: 100% !important;
          margin: 10px 0px;
        }

        .input-file {
          width: 100% !important;
        }
      }
  `
})
export class UciDocenteFormsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  formulario!: FormGroup;

  protected router = inject(Router);
  
  @Input() docente: IDocenteModel = {} as IDocenteModel
  @Output() onSubmit = new EventEmitter();

  statusOptions = [
    {
      label: 'Ativo',
      value: 'A'
    },
    {
      label: 'Inativo',
      value: 'I'
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
    }
  ]

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usu_no_usuario: [this.docente.usu_no_usuario ?? null, [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      usu_co_cpf: [this.docente.usu_co_cpf ?? null, [Validators.required, Validators.maxLength(14), Validators.minLength(11)]],
      usu_no_email: [this.docente.usu_no_email ?? null, [Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(5)]],
      usu_nu_telefone: [this.docente.usu_nu_telefone ?? null, [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      usu_in_status: [this.docente.usu_in_status ?? 'A', [Validators.required]],
      usu_in_tipo: [this.docente.usu_in_tipo ?? 'P', [Validators.required]],
      usu_dt_nascimento: [this.docente.usu_dt_nascimento !== undefined ? new Date(this.docente.usu_dt_nascimento) : null, [Validators.required]],
      usu_dt_cadastro: [this.docente.usu_dt_cadastro !== undefined? new Date(this.docente.usu_dt_cadastro) : null, [Validators.required]],
      usu_co_usuario: [this.docente.usu_co_usuario ?? null]
    });
  }
  


  submitForm(){
    if(this.formulario.valid){
      this.onSubmit.emit(this.formulario.value)
    }else{
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
        controle?.markAsTouched();
      })
    }
  }
}
