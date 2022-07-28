import { NgModule } from "@angular/core";
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TextSlice } from "./pipes/textslicer.pipe";

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

