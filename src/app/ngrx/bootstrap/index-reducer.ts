import { BootstrapActionsUnion, BootstrapTypes } from './bootstrap.actions';
import { IBootstrapState } from './bootstrap-state.interface';
import { bootstrapInitialState } from './bootstrap-initial.state';
import { bootstrapAdapter } from './bootstrap-entity.adapter';

// export const initialAppState: IBootstrapState = {
//   // bootstrap: {
//     components: [{
//       type: VariableTypes.size,
//       value: '2rem',
//       variable: '$jumbotron-padding',
//       component: 'jumbotron'
//     }, {
//       type: VariableTypes.color,
//       value: '#E9ECEF',
//       variable: '$jumbotron-bg',
//       component: 'jumbotron'
//     }],
//     // jumbotron: {
//     //   padding: {
//     //     type: VariableTypes.size,
//     //     value: '2rem',
//     //     variable: '$jumbotron-padding'
//     //   },
//     //   background: {
//     //     type: VariableTypes.color,
//     //     value: '#E9ECEF',
//     //     variable: '$jumbotron-bg'
//     //   }
//     // },
//     selectedComponent: 'jumbotron'
//   // }
// }

export function indexReducer(state: IBootstrapState = bootstrapInitialState, action: BootstrapActionsUnion) {
  switch (action.type) {
    case BootstrapTypes.UpdateComponentProperty: {
      return bootstrapAdapter.updateOne(action.payload.component, state);
    }

    // case BootstrapTypes.UpdateComponentProperty:
    //   const component = state[action.component];
    //   const componentProperty = component[action.property];

    //   return {
    //     ...state,
    //     [action.component]: {
    //       ...component,
    //       [action.property]: {
    //         ...componentProperty,
    //         value: action.value
    //       }
    //     }
    //   };

    default: {
      return state;
    }
  }
}
