import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { NgSelectModule } from "@ng-select/ng-select";

import { FontWeightComponent } from "./font-weight.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  declarations: [FontWeightComponent],
  exports: [FontWeightComponent]
})
export class FontWeightModule {}
