import { NgModule } from "@angular/core";

import { JumbotronModule } from './jumbotron/jumbotron.module';

@NgModule({
  imports: [
    JumbotronModule
  ],
  exports: [
    JumbotronModule
  ]
})
export class BootstrapComponentsModule {}
