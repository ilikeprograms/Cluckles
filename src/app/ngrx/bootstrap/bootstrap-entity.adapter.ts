import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IVariable } from './variables.interface';

export const bootstrapAdapter: EntityAdapter<IVariable<any>> = createEntityAdapter<IVariable<any>>();
