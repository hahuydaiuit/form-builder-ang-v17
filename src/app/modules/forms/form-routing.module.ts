import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder';
import { AnswersComponent } from './answers';
import { ENDROUTERNAME } from '@shared/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: ENDROUTERNAME.FORM.BUILDER,
    pathMatch: 'full',
  },
  {
    path: ENDROUTERNAME.FORM.BUILDER,
    component: BuilderComponent,
  },
  {
    path: ENDROUTERNAME.FORM.ANSWERS,
    component: AnswersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
