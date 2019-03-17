import { Component, ViewEncapsulation, ElementRef } from "@angular/core";

import { SassService } from 'src/app/core/sass-js/sass.service';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.html',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ComponentContainerComponent {
  constructor(
    private sassService: SassService,
    private elementRef: ElementRef
  ) {
    this.sassService.compilation$.subscribe((style: string) => {
      const styleTag: HTMLStyleElement = document.createElement('style');

      styleTag.innerHTML = style;

      elementRef.nativeElement.shadowRoot.insertBefore(styleTag, elementRef.nativeElement.childNodes[0]);
    });

    // Compile with default
    this.sassService.compile('@import "custom.scss"');
  }
}
