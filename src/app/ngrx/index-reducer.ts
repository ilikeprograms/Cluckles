import { Action } from 'rxjs/internal/scheduler/Action';
import { IndexState } from './index-state.interface';
import { VariableTypes } from './variables.interface';
import { BootstrapActionsUnion, BootstrapTypes } from './bootstrap.actions';

export const initialAppState: IndexState = {
  jumbotron: {
    padding: '2rem',
    background: {
      type: VariableTypes.color,
      value: '#E9ECEF'
    }
  }
}

export function indexReducer(state: IndexState = initialAppState, action: BootstrapActionsUnion) {
  switch (action.type) {
    case BootstrapTypes.UpdateColor:
      const component = state[action.component];
      const componentProperty = component[action.property];

      return {
        ...state,
        [action.component]: {
          [action.property]: {
            ...componentProperty,
            value: action.color
          }
        }
      };
    default: {
      return state;
    }
  }
}
