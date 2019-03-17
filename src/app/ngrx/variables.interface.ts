export enum VariableTypes {
  color = 'color'
}

export interface IVariable {
  type: VariableTypes;
}

export interface IColorType extends IVariable {
  value: string;
}
