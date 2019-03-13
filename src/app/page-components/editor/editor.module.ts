import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { editorRoutes } from './editor.route-module';

@NgModule({
  imports: [
    editorRoutes
  ],
  declarations: [
    EditorComponent
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule {}
