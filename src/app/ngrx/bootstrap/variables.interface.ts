export enum VariableTypes {
  color = "color",
  size = "size",
  fontweight = "fontweight"
}

export interface IVariableValue {
  value: string;
}

export interface IVariable<T> extends IVariableValue {
  id: string;
  type: T;
  variable: string;
  label: string;
  component: string;
}
export interface ISizeUnit {
  unit: string;
}

export interface ISizeType extends IVariable<VariableTypes.size>, ISizeUnit {}

export type IColorType = IVariable<VariableTypes.color>;
