import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core'

import { BootstrapComponentAlertComponent } from './bootstrap-components/bootstrap-component-alert/bootstrap-component-alert.component';

@Component({
  selector: 'cluckles-components-display-component',
  entryComponents: [
    BootstrapComponentAlertComponent
  ],
  template: `
    <cluckles-bootstrap-component-loader [shownComponents]="shownComponents"></cluckles-bootstrap-component-loader>
  `,
  styleUrls: []
})
export class ComponentDisplayComponent implements OnInit, OnChanges {
  @Input()
  selectedComponent: Component = BootstrapComponentAlertComponent;

  public shownComponents;

  constructor() { console.log('constructed'); }

  ngOnInit(): void {
    console.log('hre');
    console.log(this.selectedComponent);
    if (this.selectedComponent) {
      this.shownComponents = {
        component: BootstrapComponentAlertComponent,
        inputs: {}
      };
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
     console.log('hre');
    console.log(this.selectedComponent);
    // if (this.selectedComponent) {
    //   this.shownComponents = {
    //     component: this.selectedComponent,
    //     inputs: {}
    //   };
    // }
  }
};
