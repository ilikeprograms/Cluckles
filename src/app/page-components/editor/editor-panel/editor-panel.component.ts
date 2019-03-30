import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { SassService } from 'src/app/core/sass-js/sass.service';
import { BootstrapFacade } from 'src/app/ngrx/bootstrap/bootstrap.facade';
import { Observable } from 'rxjs';
import { IVariable, VariableTypes, IColorType } from 'src/app/ngrx/bootstrap/variables.interface';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit {
  public selectedComponentProperties$: Observable<Array<IVariable<VariableTypes>>>;
  public componentProperties$: Observable<Map<string, IVariable<VariableTypes>>>;

  public selectedComponents: Array<string>;
  public variableTypes = VariableTypes;

  constructor(
    private bootstrapFacade: BootstrapFacade
  ) {
    this.bootstrapFacade.selectedComponents$.subscribe((selectedComponents: Array<string>) => {
      this.selectedComponents = selectedComponents;
    });
    this.selectedComponentProperties$ = this.bootstrapFacade.selectedComponentProperties$;
    // this.componentProperties$ = this.bootstrapFacade.componentProperties$;
  }

  public ngOnInit(): void {
    this.componentProperties$ = this.bootstrapFacade.componentProperties$;
  }

  public compileChange(component, value: string) {
    this.bootstrapFacade.updateComponentProperty(component.id, value);
  }

  public sizeChange(component, value: string) {
    this.bootstrapFacade.updateComponentProperty(component.id, value);
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
