import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClrFormsModule } from '@clr/angular';

import { ColorPickerComponent } from './color-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ColorPickerComponent,
  ],
  exports: [
    ColorPickerComponent
  ]
})
export class ColorPickerModule {}
