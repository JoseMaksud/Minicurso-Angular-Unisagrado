import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UciDocenteComponent } from './uci-docente/uci-docente.component';
import { UciDocenteAddComponent } from './uci-docente/uci-docente-add/uci-docente-add.component';
import { UciDocenteEditComponent } from './uci-docente/uci-docente-edit/uci-docente-edit.component';

const routes: Routes = [
  { path: '', component: UciDocenteComponent},
  { path: 'cadastro', component: UciDocenteAddComponent},
  { path: 'editar/:id', component: UciDocenteEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UciDocenteRoutingModule { }
