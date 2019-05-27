import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClrFormsModule } from '@clr/angular';
import { TextUnitComponent } from './text-unit.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClrFormsModule],
  declarations: [TextUnitComponent],
  exports: [TextUnitComponent],
})
export class TextUnitModule {}
