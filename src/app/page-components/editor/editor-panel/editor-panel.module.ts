import { NgModule } from '@angular/core';

import { EditorPanelComponent } from './editor-panel.component';
import { ColorPickerModule } from 'src/app/common/color-picker/color-picker.module';
import { SizeUnitModule } from 'src/app/common/size-unit/size-unit.module';
import { CommonModule } from '@angular/common';
import { ClrStackViewModule, ClrIconModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerModule,
    ClrStackViewModule,
    ClrIconModule,
    SizeUnitModule
  ],
  declarations: [
    EditorPanelComponent
  ],
  exports: [
    EditorPanelComponent
  ]
})
export class EditorPanelModule {}
