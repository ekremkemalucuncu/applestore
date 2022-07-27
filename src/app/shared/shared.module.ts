import { NgModule } from "@angular/core";
import { TextSlice } from "./pipes/pipe";
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    TextSlice,
    ValidationMessageComponent
  ],
  declarations: [
    TextSlice,
    ValidationMessageComponent
  ]
})

export class SharedModule { }

