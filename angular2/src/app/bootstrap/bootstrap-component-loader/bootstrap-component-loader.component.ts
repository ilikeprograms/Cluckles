import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Input } from '@angular/core';

@Component({
  selector: 'cluckles-bootstrap-component-loader',
  templateUrl: './bootstrap-component-loader.component.html',
  styleUrls: ['./bootstrap-component-loader.component.css']
})
export class BootstrapComponentLoaderComponent {
  private currentComponent = null;

  @ViewChild('componentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  @Input() set shownComponents(componentInfo) {
    if (!componentInfo) { return; }

    // Turn inputs into dependy injection providers
    let inputProviders = Object.keys(componentInfo.inputs).map((inputName) => {
      return {
        provide: inputName,
        useValue: componentInfo.inputs[inputName]
      }
    });

    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    let injector =  ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    let factory = this.resolver.resolveComponentFactory(componentInfo.component);

    let component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

}
