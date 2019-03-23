import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { IndexState } from '../index-state.interface';
import { getSelectedComponentProperties, getComponentProperties } from './bootstrap-selectors';
import { UpdateComponentPropertyAction } from './bootstrap.actions';
import { IVariable, VariableTypes } from './variables.interface';
import { Observable } from 'rxjs';

// type bootstrapComponentsType = keyof IBootstrapState;

// interface ISelectedComponent<T, K<IVariable<VariableTypes>> {
//   [IBootstrapState.selectedComponent]: T<K>
// }

@Injectable()
export class BootstrapFacade {
  public selectedComponent$: Observable<IVariable<VariableTypes>>;
  public selectedComponentProperties$: Observable<Array<IVariable<VariableTypes>>>;
  public componentProperties$: Observable<Map<string, IVariable<VariableTypes>>>;


  getComponentProperties

  constructor(
    private store: Store<IndexState>
  ) {
    this.selectedComponentProperties$ = this.store.pipe(select(getSelectedComponentProperties));
    this.componentProperties$ = this.store.pipe(select(getComponentProperties));
  }

  public selectColor(component: string, color: string) {
    // return this.store.pipe(select(selectColor, {component, color}));
  }

  public updateComponentProperty(id: string, value: string) {
    this.store.dispatch(new UpdateComponentPropertyAction({
      component: {
        id,
        changes: {
          value
        }
      }
    }));
  }
}
