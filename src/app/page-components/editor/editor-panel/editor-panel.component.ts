import { Component, OnInit } from "@angular/core";

import { map, take } from "rxjs/operators";

import { SassService } from "src/app/core/sass-js/sass.service";
import { BootstrapFacade } from "src/app/ngrx/bootstrap/bootstrap.facade";
import { Observable } from "rxjs";
import {
  IVariable,
  VariableTypes,
  IColorType,
  ISizeType
} from "src/app/ngrx/bootstrap/variables.interface";
import { ISizeOutput } from "src/app/common/size-unit/size-output.interface";

@Component({
  selector: "app-editor-panel",
  templateUrl: "./editor-panel.component.html",
  styleUrls: ["./editor-panel.component.scss"]
})
export class EditorPanelComponent implements OnInit {
  public selectedComponentProperties$: Observable<
    Array<IVariable<VariableTypes>>
  >;
  public componentProperties$: Observable<
    Map<string, IVariable<VariableTypes>>
  >;

  public selectedComponents: Array<string>;
  public variableTypes = VariableTypes;

  constructor(private bootstrapFacade: BootstrapFacade) {
    this.componentProperties$ = this.bootstrapFacade.componentProperties$.pipe(
      take(1)
    );

    this.bootstrapFacade.selectedComponents$
      .pipe(take(1))
      .subscribe((selectedComponents: Array<string>) => {
        console.log("here");
        this.selectedComponents = selectedComponents;
      });
    this.selectedComponentProperties$ = this.bootstrapFacade.selectedComponentProperties$;
  }

  public ngOnInit(): void {}

  public compileChange(component, value: string) {
    this.bootstrapFacade.updateComponentProperty(component.id, value);
  }

  public sizeChange(component, size: ISizeOutput) {
    this.bootstrapFacade.updateSizeProperty(component.id, size);
  }

  public isComponentVisible(componentName: string): boolean {
    return this.selectedComponents.indexOf(componentName) !== -1;
  }

  public toggleComponentVisible(componentName: string, event) {
    this.bootstrapFacade.toggleComponentVisible(componentName);

    event.preventDefault();
    event.stopPropagation();
  }
}
