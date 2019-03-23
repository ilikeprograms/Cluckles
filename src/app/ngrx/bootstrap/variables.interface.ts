export enum VariableTypes {
  color = 'color',
  size = 'size'
}

export interface IVariable<T> {
  id: string;
  type: T;
  value: string;
  variable: string;
  component: string;
}

export type IColorType = IVariable<VariableTypes.color>;
