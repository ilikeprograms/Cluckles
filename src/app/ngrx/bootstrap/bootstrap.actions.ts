import { Action } from '@ngrx/store';
import { IVariable, VariableTypes } from './variables.interface';
import { Update } from '@ngrx/entity';

export enum BootstrapTypes {
  UpdateComponentProperty = '[Bootstrap] UpdateColor',
  Compile = '[Bootstrap] Compile'
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

export type BootstrapActionsUnion = UpdateComponentPropertyAction | CompileAction;
