import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { appRoutes } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { UiBlockerModule } from './common/ui-blocker/ui-blocker.module';
import { indexReducer } from './ngrx/index-reducer';
import { BootstrapFacade } from './ngrx/bootstrap.facade';
import { EffectsModule } from '@ngrx/effects';
import { BootstrapEffects } from './ngrx/bootstrap.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    LayoutModule,
    StoreModule.forRoot({ bootstrap: indexReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([BootstrapEffects]),
    appRoutes
  ],
  providers: [
    BootstrapFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
