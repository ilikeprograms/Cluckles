import { NgModule } from "@angular/core";

import { JumbotronModule } from './jumbotron/jumbotron.module';
import { ProgressModule } from './progress/progress.module';

@NgModule({
  imports: [
    JumbotronModule,
    ProgressModule
  ],
  exports: [
    JumbotronModule,
    ProgressModule
  ]
})
export class BootstrapComponentsModule {}
