import { IBootstrapState } from './bootstrap/bootstrap-state.interface';
import { EntityState } from '@ngrx/entity';
import { IVariable } from './bootstrap/variables.interface';

export interface IndexState {
  bootstrap: EntityState<IVariable<any>>;
}
