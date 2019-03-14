import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { SassService } from 'src/app/core/sass-js/sass.service';

declare var Sass: any;

const toCompile = '@import "custom.scss"';

@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditorComponent {

  constructor(
    private sassService: SassService,
    private elementRef: ElementRef
  ) {
    this.sassService.compilation$.subscribe((style: string) => {
      const styleTag: HTMLStyleElement = document.createElement('style');

      styleTag.innerHTML = style;

      elementRef.nativeElement.shadowRoot.insertBefore(styleTag, elementRef.nativeElement.childNodes[0]);
    });

    this.sassService.compile(toCompile);
  }
}
