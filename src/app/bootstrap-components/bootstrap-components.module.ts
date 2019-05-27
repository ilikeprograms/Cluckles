import { NgModule } from '@angular/core';

import { JumbotronModule } from './jumbotron/jumbotron.module';
import { ProgressModule } from './progress/progress.module';
import { AlertModule } from './alert/alert.module';
import { BadgeModule } from './badge/badge.module';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { ButtonModule } from './button/button.module';
import { ButtonGroupsModule } from './button-groups/button-groups.module';
import { CardsModule } from './cards/cards.module';
import { CarouselModule } from './carousel/carousel.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { FormModule } from './forms/form.module';
import { InputGroupModule } from './input-group/input-group.module';
import { ListGroupModule } from './list-group/list-group.module';
import { NavsModule } from './navs/navs.module';
import { PaginationModule } from './pagination/pagination.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  imports: [
    AlertModule,
    BadgeModule,
    BreadcrumbsModule,
    ButtonModule,
    JumbotronModule,
    ProgressModule,
    ButtonGroupsModule,
    CardsModule,
    CarouselModule,
    DropdownModule,
    FormModule,
    InputGroupModule,
    ListGroupModule,
    NavsModule,
    PaginationModule,
    SpinnerModule,
    ToastModule,
  ],
  exports: [
    AlertModule,
    BadgeModule,
    BreadcrumbsModule,
    ButtonModule,
    JumbotronModule,
    ProgressModule,
    ButtonGroupsModule,
    CardsModule,
    CarouselModule,
    DropdownModule,
    FormModule,
    InputGroupModule,
    ListGroupModule,
    NavsModule,
    PaginationModule,
    SpinnerModule,
    ToastModule,
  ],
})
export class BootstrapComponentsModule {}
