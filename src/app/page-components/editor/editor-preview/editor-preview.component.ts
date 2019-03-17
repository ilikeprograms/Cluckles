import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { SassService } from 'src/app/core/sass-js/sass.service';

@Component({
  selector: 'app-editor-preview',
  templateUrl: './editor-preview.component.html',
  styleUrls: ['./editor-preview.component.scss']
})
export class EditorPreviewComponent {
  public compilationWaiting$: Observable<boolean>;

  constructor(
    private sassService: SassService
  ) {
    this.compilationWaiting$ = this.sassService.compilationWaiting$;
  }
}
