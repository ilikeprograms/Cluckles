import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { IndexState } from './index-state.interface';
import { BootstrapSelectors, selectColor } from './bootstrap-selectors';
import { UpdateColorAction } from './bootstrap.actions';

@Injectable()
export class BootstrapFacade {
  constructor(private store: Store<IndexState>) {}

  public selectColor(component: string, color: string) {
    return this.store.pipe(select(selectColor, {component, color}));
  }

  public updateColor(component: string, background: string, color: string) {
    this.store.dispatch(new UpdateColorAction(component, background, color));
  }
}
