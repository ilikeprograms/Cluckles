import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, withLatestFrom } from 'rxjs/operators';

import { BootstrapTypes, CompileAction } from './bootstrap.actions';
import { SassService } from '../core/sass-js/sass.service';
import { IndexState } from './index-state.interface';
import { Store } from '@ngrx/store';

@Injectable()
export class BootstrapEffects {
  @Effect({
    dispatch: false
  })
  public compile$ = this.actions$.pipe(
    ofType(BootstrapTypes.Compile),
    withLatestFrom(this.store),
    tap((result: any) => {
      console.log(result);
      const jumbotronColor = this.getColorVariable(result[1].bootstrap, 'jumbotron', 'background');

      this.sassService.compile('$jumbotron-bg: ' + jumbotronColor + '; ' + '@import "custom.scss"');
    })
  );

  @Effect()
  public updateColor$ = this.actions$.pipe(
    ofType(BootstrapTypes.UpdateColor),
    map(() => {
      return new CompileAction();
    })
  );

  private getColorVariable(state: Store<IndexState>, componentName: string, property: string) {
    const component = state[componentName];
    const componentProperty = component[property];

    return componentProperty.value;
  }

  constructor(
    private actions$: Actions,
    private store: Store<IndexState>,
    private sassService: SassService
  ) {}
}
