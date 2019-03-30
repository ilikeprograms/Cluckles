import { Action } from '@ngrx/store';
import { IVariable, VariableTypes } from './variables.interface';
import { Update } from '@ngrx/entity';

export enum BootstrapTypes {
  UpdateComponentProperty = '[Bootstrap] UpdateColor',
  Compile = '[Bootstrap] Compile',
  ToggleComponentVisible = '[Bootstrap] ToggleComponentVisible'
}

export class UpdateComponentPropertyAction implements Action {
  readonly type = BootstrapTypes.UpdateComponentProperty;

  constructor(
    public payload: { component: Update<IVariable<VariableTypes>> }
  ) {}
}

export class CompileAction implements Action {
  readonly type = BootstrapTypes.Compile;
}

export class ToggleComponentVisible implements Action {
  readonly type = BootstrapTypes.ToggleComponentVisible;

  constructor(
    public componentName: string
  ) {}
}

export type BootstrapActionsUnion = UpdateComponentPropertyAction | CompileAction | ToggleComponentVisible;
