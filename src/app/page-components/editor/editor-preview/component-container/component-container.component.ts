import { Component, ViewEncapsulation, ElementRef } from "@angular/core";

import { SassService } from 'src/app/core/sass-js/sass.service';
import { BootstrapFacade } from 'src/app/ngrx/bootstrap/bootstrap.facade';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.html',
  styleUrls: ['./component-container.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ComponentContainerComponent {
  public selectedComponents: Array<string>;

  constructor(
    private sassService: SassService,
    private elementRef: ElementRef,
    private bootstrapFacade: BootstrapFacade
  ) {
    this.sassService.compilation$.subscribe((style: string) => {
      const styleTag: HTMLStyleElement = document.createElement('style');

      styleTag.innerHTML = style;

      elementRef.nativeElement.shadowRoot.insertBefore(styleTag, elementRef.nativeElement.childNodes[0]);
    });

    // Compile with default
    this.sassService.compile('@import "custom.scss"');

    this.bootstrapFacade.selectedComponents$.subscribe((selectedComponents: Array<string>) => {
      this.selectedComponents = selectedComponents;
    });
  }

  public isComponentVisible(componentName: string): boolean {
    return this.selectedComponents.indexOf(componentName) !== -1;
  }
}
