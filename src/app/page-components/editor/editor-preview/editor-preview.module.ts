import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorPreviewComponent } from './editor-preview.component';
import { UiBlockerModule } from 'src/app/common/ui-blocker/ui-blocker.module';

import { ComponentContainerModule } from './component-container/component-container.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentContainerModule,
    UiBlockerModule
  ],
  declarations: [EditorPreviewComponent],
  exports: [EditorPreviewComponent]
})
export class EditorPreviewModule {}
