import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, withLatestFrom } from 'rxjs/operators';

import { BootstrapTypes, CompileAction } from './bootstrap.actions';
import { SassService } from '../../core/sass-js/sass.service';
import { Store, select } from '@ngrx/store';
import { IndexState } from '../index-state.interface';
import { IBootstrapState } from './bootstrap-state.interface';
import { IVariable, VariableTypes } from './variables.interface';
import { selectAllBootstrapComponents } from './bootstrap-selectors';

@Injectable()
export class BootstrapEffects {
  @Effect({
    dispatch: false
  })
  public compile$ = this.actions$.pipe(
    ofType(BootstrapTypes.Compile),
    withLatestFrom(this.store.pipe(select(selectAllBootstrapComponents))),
    tap(([compileAction, components]: [CompileAction, Array<IVariable<VariableTypes>>]) => {
      // console.log(bootstrapState);
      // console.log()

      let toCompile: string = '';

      // const bootstrapComponents: IBootstrapState = bootstrapState.bootstrap;


      components.forEach((component: IVariable<VariableTypes>) => {
        toCompile += `${component.variable}: ${component.value}; `;
      });


      console.log(toCompile);

      this.sassService.compile(toCompile + '@import "custom.scss"');


    })
  );

  @Effect()
  public updateColor$ = this.actions$.pipe(
    ofType(BootstrapTypes.UpdateComponentProperty),
    map(() => {
      return new CompileAction();
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<IndexState>,
    private sassService: SassService
  ) {}
}
