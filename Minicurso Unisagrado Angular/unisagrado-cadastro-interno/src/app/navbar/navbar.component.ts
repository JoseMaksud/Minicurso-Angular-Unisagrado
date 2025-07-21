import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, lastValueFrom, Subscription } from 'rxjs';
import { INavBar } from './navbar.interface';
import { NavbarService } from './navbar.service';
import { IDocenteModel } from '../uci-docente/uci-docente/uci-docente.interface';


@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, CommonModule, ButtonModule, MenuModule],
  template: `
    <div class="ud-navbar-component">
      <p-menubar [model]="items">
        <ng-template #start>
          <div class="img-logo" style="max-width: 130px">
            <img style="width: 100%;" src="unisagrado-transparente-cor.png" alt="">
          </div>
        </ng-template>
          <ng-template #end>
          @if(user.usu_co_usuario !== undefined){
            <div class="flex items-center gap-2">
              <div class="user-menu">
                <span>Olá, {{user.usu_no_usuario}}</span>
                <div class="menu-drop">
                  <p-menu #menu [model]="userItems" [popup]="true"></p-menu>
                  <p-button icon="pi pi-angle-down"  [text]="true" (click)="menu.toggle($event)"></p-button>
                </div>
              </div>
            </div>
          }
          </ng-template>
      </p-menubar>
    </div>
  `,
  styles: `
    .user-menu{
      display: flex;
      align-items: center;
    }
  `,
  standalone: true
})
export class NavbarComponent implements OnInit {
  protected auth0Service: AuthService = inject(AuthService);
  
  subs: Subscription[] = [];

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/home'
    },
    {
      label: 'Portal Docentes',
      icon: 'pi pi-graduation-cap',
      routerLink: '/docentes'
    }
  ];

  userItems: MenuItem[] = [
    {
      label: 'Alterar Senha',
      icon: 'pi pi-key',
      command: () => {
      }
    },
    {
      label: 'Sair',
      icon:'pi pi-sign-out',
      command: () => {
        this.auth0Service.logout();
        this.user = {} as IDocenteModel;
      }
    },
  ];

  private navbarService: INavBar = inject(NavbarService);
  private messageService = inject(MessageService);

  user: IDocenteModel = {} as IDocenteModel;

  ngOnInit(): void {
    this.subs.push(
      this.auth0Service.user$.subscribe(async user => {
        if(user?.sub !== undefined){
          const userInfo: any = await lastValueFrom(this.navbarService.getUser(user.sub).pipe(
            catchError(error => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar usuário ' + error.error.message })
              return error;
            })
          ));
          this.user = userInfo[0];      
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
