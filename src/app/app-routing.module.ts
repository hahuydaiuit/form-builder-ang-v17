import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENDROUTERNAME } from './shared';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ENDROUTERNAME.FORM.FORM,
    pathMatch: 'full',
  },
  {
    path: ENDROUTERNAME.FORM.FORM,
    loadChildren: () =>
      import('./modules/forms/form.module').then((m) => m.FormModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
