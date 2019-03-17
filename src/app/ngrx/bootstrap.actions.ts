import { Action } from '@ngrx/store';

export enum BootstrapTypes {
  UpdateColor = '[Bootstrap] UpdateColor',
  Compile = '[Bootstrap] Compile'
}

export class UpdateColorAction implements Action {
  readonly type = BootstrapTypes.UpdateColor;

  constructor(public component: string, public property: string, public color: string) {}
}

export class CompileAction implements Action {
  readonly type = BootstrapTypes.Compile;
}

export type BootstrapActionsUnion = UpdateColorAction | CompileAction;
