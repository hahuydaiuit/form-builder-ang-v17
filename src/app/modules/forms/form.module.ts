import { NgModule } from '@angular/core';

import { FormRoutingModule } from './form-routing.module';
import { BuilderComponent } from './builder';
import { AnswersComponent } from './answers';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BuilderComponent, AnswersComponent],
  imports: [FormRoutingModule, SharedModule],
})
export class FormModule {}
