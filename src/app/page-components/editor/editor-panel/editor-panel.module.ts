import { NgModule } from '@angular/core';

import { EditorPanelComponent } from './editor-panel.component';
import { ColorPickerModule } from 'src/app/common/color-picker/color-picker.module';

@NgModule({
  imports: [
    ColorPickerModule
  ],
  declarations: [
    EditorPanelComponent
  ],
  exports: [
    EditorPanelComponent
  ]
})
export class EditorPanelModule {}
