import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewQuestionComponent } from '@shared/components';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddNewQuestionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
