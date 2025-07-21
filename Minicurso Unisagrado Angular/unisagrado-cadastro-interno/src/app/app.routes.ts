import { Routes } from '@angular/router';
import { UciHomeComponent } from './uci-home/uci-home.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: 'home', component: UciHomeComponent},
    { path: 'docentes', canActivate: [AuthGuard], loadChildren: () => import('./uci-docente/uci-docente-routing.module').then((m) => m.UciDocenteRoutingModule)},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
