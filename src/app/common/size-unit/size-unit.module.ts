import { SizeUnitComponent } from "./size-unit.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClrFormsModule } from "@clr/angular";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClrFormsModule,
    NgSelectModule
  ],
  declarations: [SizeUnitComponent],
  exports: [SizeUnitComponent]
})
export class SizeUnitModule {}
