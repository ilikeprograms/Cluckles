import { IndexState } from '../index-state.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IBootstrapState } from './bootstrap-state.interface';
import { bootstrapAdapter } from './bootstrap-entity.adapter';
import { IVariable, VariableTypes } from './variables.interface';
import { Observable } from 'rxjs';
import { EntityState, Dictionary } from '@ngrx/entity';

export const getFeature = createFeatureSelector<IBootstrapState>('bootstrap');
export const getSelectedComponentId = createSelector(getFeature, (state: IBootstrapState) => state.selectedComponent);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bootstrapAdapter.getSelectors();

// select the array of user ids
export const selectBootstrapComponentIds = createSelector(getFeature, selectIds);

// select the dictionary of BootstrapComponent entities
export const selectBootstrapComponentEntities = createSelector(getFeature, selectEntities);

// select the array of BootstrapComponents
export const selectAllBootstrapComponents = createSelector(getFeature, selectAll);

// select the total BootstrapComponent count
export const selectBootstrapComponentTotal = createSelector(getFeature, selectTotal);

export const getSelectedComponentProperties = createSelector(
  getSelectedComponentId,
  selectAllBootstrapComponents,
  (selectedComponent: string, entities: Array<IVariable<VariableTypes>>): Array<IVariable<VariableTypes>> => {
    console.log(entities.filter((entity: IVariable<VariableTypes>) => entity.component === selectedComponent));
    return entities.filter((entity: IVariable<VariableTypes>) => entity.component === selectedComponent);
  }
);

export const getComponentProperties = createSelector(
  selectAllBootstrapComponents,
  (entities: Array<IVariable<VariableTypes>>): Map<string, IVariable<VariableTypes>> => {
    const components = new Map();

    entities.map((entity: IVariable<VariableTypes>) => {
      components.set(entity.component, {
        ...components.get(entity.component),
        [entity.type]: entity
      })
    });

    console.log(components.entries());

    return components;
  }
);
