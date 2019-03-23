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
  // public jumbotronColor$: Observable<string>;
  public selectedComponent$: Observable<IVariable<VariableTypes>>;
  public selectedComponentProperties$: Observable<Array<IVariable<VariableTypes>>>;
  public componentProperties$: Observable<Map<string, IVariable<VariableTypes>>>;

  public variableTypes = VariableTypes;

  constructor(
    private bootstrapFacade: BootstrapFacade
  ) {
    this.selectedComponentProperties$ = this.bootstrapFacade.selectedComponentProperties$;
    // this.componentProperties$ = this.bootstrapFacade.componentProperties$;
  }

  public ngOnInit(): void {
    this.componentProperties$ = this.bootstrapFacade.componentProperties$;
    // this.jumbotronColor$ = this.bootstrapFacade.selectColor('jumbotron', 'background').pipe(map((value: IColorType) => {
    //   return value.value;
    // }));

    // this.selectedComponentProperties$ = this.bootstrapFacade.selectedComponentProperties$;
  }

  public compileChange(component, value: string) {
    this.bootstrapFacade.updateComponentProperty(component.id, value);
  }

  public sizeChange(component, value: string) {
    this.bootstrapFacade.updateComponentProperty(component.id, value);
  }
}
