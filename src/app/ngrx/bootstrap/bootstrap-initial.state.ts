import { bootstrapAdapter } from './bootstrap-entity.adapter';
import { IBootstrapState } from './bootstrap-state.interface';
import { IVariable, VariableTypes } from './variables.interface';

import { v4 as uuid } from 'uuid';

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();

const initialEntities: { [x: number]: IVariable<VariableTypes> } = {
    [id1]: {
      id: id1,
      type: VariableTypes.size,
      value: '2rem',
      variable: '$jumbotron-padding',
      component: 'jumbotron'
  },
  [id2]: {
      id: id2,
      type: VariableTypes.color,
      value: '#E9ECEF',
      variable: '$jumbotron-bg',
      component: 'jumbotron'
  },
  [id3]: {
    id: id3,
    type: VariableTypes.color,
    value: '#E9ECEF',
    variable: '$card-bg',
    component: 'card'
  },
};

export const bootstrapInitialState: IBootstrapState = bootstrapAdapter.getInitialState({
  entities: initialEntities,
  ids: [id1, id2, id3],
  selectedComponent: ''
});
