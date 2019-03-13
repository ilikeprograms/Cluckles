import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    ClarityModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule {}
