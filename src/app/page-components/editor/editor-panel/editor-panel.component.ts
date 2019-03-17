import { Component } from '@angular/core';
import { SassService } from 'src/app/core/sass-js/sass.service';

const toCompile = '@import "custom.scss"';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent {
  constructor(private sassService: SassService) {}

  public compileChange(color: string) {
    this.sassService.compile('$jumbotron-bg: ' + color + '; ' + toCompile);
  }
}
