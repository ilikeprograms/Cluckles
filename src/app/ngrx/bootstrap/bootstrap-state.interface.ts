import { EntityState } from '@ngrx/entity';

import { IVariable } from './variables.interface';

export interface IBootstrapState extends EntityState<IVariable<any>> {
  // jumbotron: {
  //   padding: IVariable<VariableTypes.size>;
  //   background: IVariable<VariableTypes.color>;
  // };
  selectedComponent: string | null;
}
