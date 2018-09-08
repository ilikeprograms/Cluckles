import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
