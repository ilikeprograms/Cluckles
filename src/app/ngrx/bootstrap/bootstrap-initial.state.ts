import { bootstrapAdapter } from './bootstrap-entity.adapter';
import { IBootstrapState } from './bootstrap-state.interface';
import { IVariable, VariableTypes } from './variables.interface';

import { v4 as uuid } from 'uuid';
import { bootstrapVariables } from './data/bootstrap-variables.const';
import { bootstrapComponentNames } from './data/bootstrap-component-names.const';

const initialEntities: { [x: number]: IVariable<VariableTypes> } = {};

// Itterate over each variable and get the ID out of it and turn it into an object
bootstrapVariables.forEach((entity: IVariable<VariableTypes>) => {
  initialEntities[entity.id] = entity;
});

export const bootstrapInitialState: IBootstrapState = bootstrapAdapter.getInitialState({
  entities: initialEntities,
  ids: bootstrapVariables.map((entity: IVariable<VariableTypes>) => entity.id),
  selectedComponents: bootstrapComponentNames
});
