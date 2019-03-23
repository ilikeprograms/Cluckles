import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { appRoutes } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { indexReducer } from './ngrx/bootstrap/index-reducer';
import { BootstrapFacade } from './ngrx/bootstrap/bootstrap.facade';
import { BootstrapEffects } from './ngrx/bootstrap/bootstrap.effect';

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
    StoreModule.forRoot({}),
    StoreModule.forFeature('bootstrap', indexReducer),
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
