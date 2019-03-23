import { Component, Input } from "@angular/core";

@Component({
  selector: 'clr-vertical-nav',
  template: '<ng-content></ng-content>'
})
export class MockClrVerticalNavComponent {
  @Input()
  public clrVerticalNavCollapsible: boolean;
}
