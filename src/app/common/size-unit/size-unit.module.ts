import { SizeUnitComponent } from './size-unit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClrFormsModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SizeUnitComponent,
  ],
  exports: [
    SizeUnitComponent
  ]
})
export class SizeUnitModule {}
