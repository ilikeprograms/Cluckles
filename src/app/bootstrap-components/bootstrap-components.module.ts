import { NgModule } from "@angular/core";

import { JumbotronModule } from './jumbotron/jumbotron.module';
import { ProgressModule } from './progress/progress.module';
import { AlertModule } from './alert/alert.module';
import { BadgeModule } from './badge/badge.module';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [
    AlertModule,
    BadgeModule,
    BreadcrumbsModule,
    ButtonModule,
    JumbotronModule,
    ProgressModule
  ],
  exports: [
    AlertModule,
    BadgeModule,
    BreadcrumbsModule,
    ButtonModule,
    JumbotronModule,
    ProgressModule
  ]
})
export class BootstrapComponentsModule {}
