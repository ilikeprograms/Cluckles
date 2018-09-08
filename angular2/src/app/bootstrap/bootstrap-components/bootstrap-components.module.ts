import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapComponentAlertComponent } from './bootstrap-component-alert/bootstrap-component-alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BootstrapComponentAlertComponent,
  ],
  exports: [
    BootstrapComponentAlertComponent,
  ],
  providers: [
    BootstrapComponentAlertComponent
  ]
})
export class BootstrapComponentsModule { }
