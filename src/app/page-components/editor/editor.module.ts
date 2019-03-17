import { NgModule } from '@angular/core';

import { ClrLoadingModule } from '@clr/angular';

import { EditorComponent } from './editor.component';
import { editorRoutes } from './editor.route-module';
import { EditorPanelModule } from './editor-panel/editor-panel.module';
import { EditorPreviewModule } from './editor-preview/editor-preview.module';

@NgModule({
  imports: [
    editorRoutes,
    ClrLoadingModule,

    EditorPanelModule,
    EditorPreviewModule
  ],
  declarations: [
    EditorComponent
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule {}
