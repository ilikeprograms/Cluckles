    var BootstrapClucklesLess = function () {
        this.brandingComponent = new BrandingComponent();

        this.components = [
            this.brandingComponent
        ];
    };
    
    console.log('CustomEvent' in window);

    docContext.addEventListener('DOMContentLoaded', function () {
        var loadedEvent = new CustomEvent('ClucklesFrameworkModuleLoaded', {
           detail: {
               module: BootstrapClucklesLess
           },
           bubbles: true,
           cancellable: true
        });
        
        console.log(loadedEvent);

        window.dispatchEvent(loadedEvent);
    });