    var SassBridge = function () {
        this.sassLib = require('node-sass');
    };
    
    SassBridge.prototype.apply = function (modifiers) {
        var sassImportStatements = this.getCssFrameworkImports();

        modifiers = this.convertModifiersToRenderFormat(modifiers);

        this.sassLib.render({
            data: modifiers + sassImportStatements,
            includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets/']
        }, function (error, result) {
            var stylesheet = document.createElement('style');
            stylesheet.innerHTML = result.css.toString();
            document.head.appendChild(stylesheet);
        });
    };
    
    SassBridge.prototype.convertModifiersToRenderFormat = function (modifiers) {
        var convertedModifiers = '';

        Object.keys(modifiers).forEach(function (modifierName) {
           convertedModifiers = modifierName + ': ' + modifiers[modifierName] + ';'; 
        });
        
        // Hardcoded to convert between less/sass format while WIP
        convertedModifiers = convertedModifiers.replace('@', '$');
        
        return convertedModifiers;
    };
    
    SassBridge.prototype.getCssFrameworkImports = function () {
        var importStatements = '';
        
        // HARCODED TO WORK WITH SASS VERSION OF BOOTSTRAP WHILE WIP
        var imports =  [
            'variables',
            'mixins',
            'normalize',
            'print',
            'glyphicons',
            'scaffolding',
            'type',
            'code',
            'grid',
            'tables',
            'forms',
            'buttons',
            // Components
            'component-animations',
            'dropdowns',
            'button-groups',
            'input-groups',
            'navs',
            'navbar',
            'breadcrumbs',
            'pagination',
            'pager',
            'labels',
            'badges',
            'jumbotron',
            'thumbnails',
            'alerts',
            'progress-bars',
            'media',
            'list-group',
            'panels',
            'responsive-embed',
            'wells',
            'close',

            // Components w/ JavaScript
            'modals',
            'tooltip',
            'popovers',
            'carousel',

            // Utility classes
            'utilities',
            'responsive-utilities',
        ];

        imports.forEach(function (importName) {
           importStatements += '@import "bootstrap/' + importName + '";';
        });

        return importStatements;
    };