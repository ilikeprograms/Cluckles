import { NgModule } from '@angular/core';

import { UiBlockerModule } from 'src/app/common/ui-blocker/ui-blocker.module';
import { ComponentContainerComponent } from './component-container.component';
import { BootstrapComponentsModule } from 'src/app/bootstrap-components/bootstrap-components.module';

@NgModule({
  imports: [
    UiBlockerModule,
    BootstrapComponentsModule
  ],
  declarations: [ComponentContainerComponent],
  exports: [ComponentContainerComponent]
})
export class ComponentContainerModule {}
