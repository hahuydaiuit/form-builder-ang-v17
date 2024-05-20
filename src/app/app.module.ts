import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
