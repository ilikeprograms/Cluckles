import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SassService } from './sass-js/sass.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        SassService
      ]
    }
  }
}
