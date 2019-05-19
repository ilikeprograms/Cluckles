import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { IndexState } from "../index-state.interface";
import {
  getSelectedComponents,
  getComponentProperties
} from "./bootstrap-selectors";
import {
  UpdateComponentPropertyAction,
  ToggleComponentVisible
} from "./bootstrap.actions";
import { IVariable, VariableTypes, ISizeType } from "./variables.interface";
import { Observable } from "rxjs";
import { ISizeOutput } from "src/app/common/size-unit/size-output.interface";

// type bootstrapComponentsType = keyof IBootstrapState;

// interface ISelectedComponent<T, K<IVariable<VariableTypes>> {
//   [IBootstrapState.selectedComponent]: T<K>
// }

@Injectable()
export class BootstrapFacade {
  public selectedComponents$: Observable<Array<string>>;
  public selectedComponentProperties$: Observable<
    Array<IVariable<VariableTypes>>
  >;
  public componentProperties$: Observable<
    Map<string, IVariable<VariableTypes>>
  >;

  constructor(private store: Store<IndexState>) {
    this.selectedComponents$ = this.store.pipe(select(getSelectedComponents));
    this.componentProperties$ = this.store.pipe(select(getComponentProperties));
  }

  public updateComponentProperty(id: string, value: string) {
    this.store.dispatch(
      new UpdateComponentPropertyAction({
        component: {
          id,
          changes: {
            value
          }
        }
      })
    );
  }

  public updateSizeProperty(id: string, size: ISizeOutput) {
    console.log(size);

    this.store.dispatch(
      new UpdateComponentPropertyAction({
        component: {
          id,
          changes: {
            value: size.value,
            unit: size.unit
          }
        }
      })
    );
  }

  public toggleComponentVisible(componentName: string): void {
    this.store.dispatch(new ToggleComponentVisible(componentName));
  }
}
