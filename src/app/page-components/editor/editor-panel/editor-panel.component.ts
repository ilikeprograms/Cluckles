import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { SassService } from 'src/app/core/sass-js/sass.service';
import { BootstrapFacade } from 'src/app/ngrx/bootstrap.facade';
import { IColorType } from 'src/app/ngrx/variables.interface';
import { Observable } from 'rxjs';

const toCompile = '@import "custom.scss"';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit {
  public jumbotronColor$: Observable<string>;

  constructor(
    private sassService: SassService,
    private bootstrapFacade: BootstrapFacade
  ) {

  }

  public ngOnInit(): void {
    this.jumbotronColor$ = this.bootstrapFacade.selectColor('jumbotron', 'background').pipe(map((value: IColorType) => {
      return value.value;
    }));
  }

  public compileChange(color: string) {
    this.bootstrapFacade.updateColor('jumbotron', 'background', color);
  }

  public sizeChange(size: string) {
    this.sassService.compile('$jumbotron-padding: ' + size + '; ' + toCompile);
  }
}
