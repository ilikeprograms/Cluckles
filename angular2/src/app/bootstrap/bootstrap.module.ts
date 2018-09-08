import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapComponentsModule } from './bootstrap-components/bootstrap-components.module'

import { BootstrapComponentLoaderComponent } from './bootstrap-component-loader/bootstrap-component-loader.component'
import { ComponentDisplayComponent } from './component-display';

import { BootstrapComponentAlertComponent } from './bootstrap-components/bootstrap-component-alert/bootstrap-component-alert.component';

@NgModule({
  imports: [
    CommonModule,
    BootstrapComponentsModule,
  ],
  exports: [
    BootstrapComponentsModule,
    ComponentDisplayComponent
  ],
  declarations: [
    BootstrapComponentLoaderComponent,
    ComponentDisplayComponent
  ],
  providers: [
    // BootstrapComponentAlertComponent,
    BootstrapComponentLoaderComponent,
    ComponentDisplayComponent
  ]
})
export class BootstrapModule { }
