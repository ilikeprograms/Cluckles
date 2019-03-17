import { IndexState } from './index-state.interface';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: IndexState) => state;

export const selectColor = createSelector(
  selectFeature,
  (state: IndexState, props: {component: string; color: string}) => {
    console.log(state, props);

    return state['bootstrap'][props.component][props.color];
  })

export class BootstrapSelectors {
  // public static selectColor =
}
