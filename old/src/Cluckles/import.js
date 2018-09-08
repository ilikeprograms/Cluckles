    /**
     * Manages the Importing of Theme files (Json) and loading the modifiers into all of
     * the editor components.
     * 
     * @class Import
     * 
     * Import Options:
     * - src: {string} The src path to the Theme file to load and parse.
     * 
	 * @param {ClucklesEditor}  editor instance which manages the less modifications.
     * @param {object}          Import options.
     * 
     * @returns {Import}
     */
    var Import = function (editor, processor, options) {
        this.editor             = editor;
        this.processor          = processor;
        this.options            = options;
        this.themeModifiers     = {};
        this.themeExtra         = {};

        this.metaDataFields = {
            author:     docContext.querySelector('*[data-cluckles-meta="author"]'),
            email:      docContext.querySelector('*[data-cluckles-meta="email"]'),
            url:        docContext.querySelector('*[data-cluckles-meta="url"]'),
            themeName:  docContext.querySelector('*[data-cluckles-meta="themeName"]'),
            version:    docContext.querySelector('*[data-cluckles-meta="version"]'),
            licence:    docContext.querySelector('*[data-cluckles-meta="licence"]')
        };        

        // Import Headers to allow the Custom Less to be able to reference,
        // variables and mixins
        this.customStylesHeader = '@import "/' + editor.lessPath  + 'variables-custom.less";\n@import "/' + editor.lessPath + 'mixins.less";\n';

        // Custom Styles textarea template and Custom styles panel (where the textareas will reside)
        this.customStylesTemplate   = null;
        this.customStylesPanel      = docContext.getElementById('customPanel');

        // Custom Styles
        this.customCss              = [];
        this.customLess             = [];
        this.customStyleInputs      = {
            Css:    [],
            Less:   []
        };

        this.setupMetadata();
        this.setupVariablesOutput();    // Setup the Variables Output, so variables can be displayed/changed directly
        this.setupCustomStyles();       // Setup the ability to handle Custom Css/Less
        this.setupFileImport();         // Setup the File input so themes can be imported

        // Attempt to load and parse the theme file at the theme.src URL
        this.parseThemeFile(this.options);
    };

    /**
     * Parses a theme.json file located at the themeURL, by default uses "GET" as the method.
     * 
     * @returns {undefined}
     */
    Import.prototype.parseThemeFile = function () {
        var themeXHR;

        // If the theme.src option was not provided
        if (!this.options || !this.options.hasOwnProperty('src')) {
            return;
        }
        
        var themeUrl = this.options.src;

        // If an url to the theme.json file was not provided, or was not a string
        if (typeof themeUrl !== 'string') {
            throw new TypeError('ClucklesEditor.parseThemeFile: The theme file options provided is not a string');
        }

        // Create a new XMLHttpRequest to fetch the theme.json file data
        themeXHR = new XMLHttpRequest();
        themeXHR.overrideMimeType('application/json'); // Make sure were expecting JSON data
        themeXHR.open('GET', themeUrl, true);

        // When the File has loaded succesfully
        themeXHR.onreadystatechange = function () {
            if (themeXHR.readyState === 4 && themeXHR.status === 200) {
                // Store the Theme Modifiers
                this.themeModifiers = JSON.parse(themeXHR.responseText);

                // Store the Theme Extra's
                if (this.themeModifiers.hasOwnProperty('_extra')) {
                    this.themeExtra = JSON.parse(JSON.stringify(this.themeModifiers._extra));
                }

                // Dont allow the import to be undo'd
                this.editor.canTrackUndo = false;
                
                // Handle the modifier/custom styles importing
                this.handleThemeImport(this.themeModifiers);

                // Now allow undo's to be tracked
                this.editor.canTrackUndo = true;
            }
        }.bind(this);

        themeXHR.send(null);
    };

    /**
     * Itterates through each editor component, and provided them the parsed modifiers,
     * so they can retrieve the modifiers the component handles.
     * 
     * @param {object} modifiers Parsed JSON (Object Litteral) containing the modifier values for the loaded theme.
     * 
     * @returns {undefined}
     */
    Import.prototype.loadComponentModifiers = function (modifiers) {
        this.editor.components.forEach(function (component) {
            // Some of the "components" may be object literals containing
            // actual "components" which inherit from ThemeModifier
            if (component instanceof ThemeModifier) {
                // Load the modifiers into the component, triggering the
                // two way data binding and updating the data subscribers
                component.loadModifiers(modifiers);
            }
        });
    };

    /**
     * Attempts to find the Theme Metadata fields, and if they exist, bind a change
     * event to them so the Metadata can be changed/set.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupMetadata = function () {        
        Object.keys(this.metaDataFields).forEach(function (fieldName) {
            var metaDataField = this.metaDataFields[fieldName];

            if (metaDataField !== null) {
                metaDataField.addEventListener('change', function (e) {
                    var modifiersMeta;

                    // If the _extra property doesnt exist, create it
                    if (!this.editor.modifiers.hasOwnProperty('_extra')) {
                        this.editor.modifiers._extra = {};
                    }

                    // If the _extra.meta property doesnt exist, create it
                    if (!this.editor.modifiers._extra.hasOwnProperty('meta')) {
                        this.editor.modifiers._extra.meta = {};
                    }

                    // Now store a reference to the meta object
                    modifiersMeta = this.editor.modifiers._extra.meta;

                    // If the field is blank
                    if (e.target.value === '') {
                        // Remove the Field if it exists
                        if (modifiersMeta.hasOwnProperty(fieldName)) {
                            delete modifiersMeta[fieldName];
                        }
                    } else {
                        // Set the Meta with the field value
                        modifiersMeta[fieldName] = e.target.value;
                    }

                    // Update the JSON Blob so the changes Metadata will be exported too!
                    this.editor.export.generateJsonBlob();
                }.bind(this));
            }
        }, this);
    };

    /**
     * Sets up the Variables Ouput change event, so when the variables are changed the modifications will be applied.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupVariablesOutput = function () {
        var variablesOutput = docContext.querySelector('*[data-cluckles="variables"]');

        variablesOutput.addEventListener('change', function (e) {
            var parsedModifiers = this.editor.processor.parseVariables(e.target.value);

            // Disable Refreshing/Applying modifiers
            this.editor.refreshMonitor.disabled = true;

            // Store and Load the modifiers, and refresh Custom Less
            this.editor.modifiers.vars = parsedModifiers;
            this.loadComponentModifiers(parsedModifiers);

            // Allow Refreshing/Applying modifiers
            this.editor.refreshMonitor.disabled = false;

            // Now apply the Custom Styles
            this.editor.refreshCustomStyles(this.editor.modifiers);
        }.bind(this));
    };

    /**
     * Binds the Events to Setup a File import, to import theme modifications from a
     * json file. Will only bind to file inputs, and import json files.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupFileImport = function () {
        var importInput = docContext.querySelector('*[data-cluckles-options="import"]');
        
        // If we can find an <input type="file" />
        if (importInput && importInput.type === 'file') {
            // Bind the change event so we know when a file was selected
            importInput.addEventListener('change', function (e) {
                var file = e.target.files[0],
                    reader = new FileReader();

                // If no file was chosen, dont try to read undefined,
                // or a json file was not selected
                if (!file || (!file.name.match(/\.(less|json)$/i))) {
                    alert('Please Select a JSON or Less file (like one exported from Cluckles)');
                    return;
                }

                // Setup the File reader, so it will import the json file's modifiers
                reader.onload = function (evt) {
                    try {
                        var modifiers = evt.target.result;

                        // Reset to default before importing, so we have a clean import
                        this.editor.resetToDefault();

                        // If the File choosen was a Less file
                        if (file.name.match(/.less/i)) {
                            // Attempt to parse the variables from the file
                            modifiers = this.editor.processor.parseVariables(modifiers);
                        } else {
                            modifiers = JSON.parse(modifiers);
                        }

                        // Handle the modifier/custom styles importing
                        this.handleThemeImport(modifiers);

                        // Reset the file input
                        importInput.value = '';
                    } catch (e) {
                        // Catch invalid JSON errors
                        throw Error('ClucklesEditor.import.setupImport: Could not parse imported File\n' + e.message);
                    }
                }.bind(this);

                // Attempt to read the file's text contents
                reader.readAsText(file);
            }.bind(this), false);
        }
    };

    /**
     * Sets up the HTML template for the Custom Styles textarea and bind's
     * the Add custom styles button.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupCustomStyles = function () {
        var addCustomLessButton = docContext.querySelector('*[data-cluckles="add-custom-less"]'),
            addCustomCssButton  = docContext.querySelector('*[data-cluckles="add-custom-css"]'),
            template            = docContext.createElement('textarea');

        // Setup the Attribute of the text area
        template.setAttribute('rows', 20);
        template.classList.add('form-control');

        template.setAttribute('id', 'clucklesCustomStylesTemplate');

        // Hide it from eyes and screenreaders
        template.classList.add('hidden');
        template.setAttribute('aria-hidden', true);   

        // Append to Custom styles Panel
        this.customStylesTemplate = template;
        this.customStylesPanel.appendChild(template);

        // Setup the Add custom styles buttons
        addCustomLessButton.addEventListener('click', function () {
            this.addCustomStyles(undefined, 'Less');
        }.bind(this), false);

        addCustomCssButton.addEventListener('click', function () {
            this.addCustomStyles(undefined, 'Css');
        }.bind(this), false);
    };

    /**
     * Handles the Creation and Storing of Custom Styles which can be Less or CSS,
     * also binds the Change event so it can change and recompile the Custom Changes.
     * 
     * @param {MouseEvent|String} styles The Custom styling to manage (or mouse event).
     * @param {string} type The type of Custom Style (Less|Css) Case Sensitive.
     * 
     * @returns {StyleElement}
     */
    Import.prototype.addCustomStyles = function (styles, type) {
        var textArea    = this.customStylesTemplate.cloneNode(false),
            customStyle = document.createElement('style'),
            styleInputs = this.customStyleInputs[type],
            // Were either adding/editing Less or Css
            styleArray  = this['custom' + type], // Array which stores styles of this Type
            styleId     = styleArray.length, // Store the index of the style
            styleCollapse = docContext.querySelector('#clucklesCustom' + type + ' .panel-body'),
            // The stylesheet Less outputs when it processes' less browser side
            lessOutputStylesheet = document.getElementById('less:' + this.editor.mainStylesheetHypenated);

        // Store the Textarea in the StyleInput array, so we can avoid DOM Manipulation later
        styleInputs.push(textArea);

        // Set a Data attribute so we can find the style's later
        customStyle.setAttribute('data-clucklesCustomStyle', type);

        // Remove the Template attributes
        textArea.removeAttribute('id');
        textArea.classList.remove('hidden');
        textArea.removeAttribute('aria-hidden');

        if (type === 'Less') {
            // Set the type so Less will compile the extra less
            customStyle.setAttribute('type', 'text/less');
        }

        // If styles are provided (and a string), set the text
        if (styles !== undefined && typeof styles === 'string') {
            // If we are adding/editing less
            if (type === 'Less') {
                // Set the text of the textarea (will be set when importing)
                // Prefix the styles with the less imports if applicable
                styles = this.prefixLessImport(styles);
                textArea.value = styles;
                
                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader.concat(styles);
            } else {
                textArea.value = styles;

                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(styles, type);
            }

            // Store the styling so it can be edited later/exported
            styleArray[styleId] = styles;
        } else {
            styleArray[styleId] = '';
        }

        // Add the Textarea to the Custom Styles Collapse
        styleCollapse.appendChild(textArea);

        // Add the Style tag (which passes the CSS/Less to less) after the main stylesheet in the head
        this.editor.mainStylesheet.parentNode.insertBefore(customStyle, lessOutputStylesheet.nextSibling || this.editor.mainStylesheet.nextSibling);

        // Setup the Change event to update the Style when the textarea changes (and recompile)
        textArea.addEventListener('change', function (e) {
            var editorModifiers         = this.editor.modifiers,
                transformedModifiers    = this.processor.transformToVariables(editorModifiers.vars);

            if (type === 'Less') {
                // Set the Type to 'text/less' so less will recompile it
                customStyle.setAttribute('type', 'text/less');

                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader + transformedModifiers + this.prefixLessImport(e.target.value);
            } else {
                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(e.target.value, type);
            }

            // Update the Stored styling
            styleArray[styleId] = e.target.value;

            // Apply the modifications, and dont use cached styles, this will
            // make sure that it will parse the styling if the type is less
            this.editor.applyModifications(editorModifiers, true);

            if (type === 'Less') {
                // Now that the less should have been compiled, it will be CSS,
                // so we can prefix it now
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(customStyle.innerHTML, type);

                // Update the CSS blob with the Compiled Custom Less
                this.editor.export.generateCssBlob();
            }
        }.bind(this));

        // Return the CustomStyle, so we can call the prefixCustomStyles method
        // once applyModifcations has been called (will be performed is type is less)
        return customStyle;
    };
    
    /**
     * Prefixes Less import syntax with the path to the Less folder, this allows @import
     * directives to be used in the custom less section, to import less files (such as importing theme.less dynamically).
     * 
     * @param {string} contents The less contents to search in and prefix imports.
     * 
     * @returns {string}
     */
    Import.prototype.prefixLessImport = function (contents) {
        return contents.replace(/(@import ")([\w-]+)(\.less")/gm, "$1/" + this.editor.lessPath + "$2$3");
    };

    /**
     * Resets the Custom style arrays, remove the custom style inputs, and remove
     * the custom style elements from the page header.
     * 
     * @returns {undefined}
     */
    Import.prototype.resetCustomStyles = function () {
        // Reset all the Stored Custom data
        this.customCss              = [];
        this.customLess             = [];
        this.customStyleInputs.Less = [];
        this.customStyleInputs.Css  = [];
        
        // Clear the Custom Css/Less panels
        docContext.querySelector('#clucklesCustomLess .panel-body').innerHTML = '';
        docContext.querySelector('#clucklesCustomCss .panel-body').innerHTML  = '';

        // Remove all Custom `style` elements
        [].slice.call(docContext.querySelectorAll('*[data-clucklesCustomStyle]')).forEach(function (customStyle) {
           customStyle.parentNode.removeChild(customStyle);
        });
    };

    /**
     * Resets the Metadata Fields if they exist.
     * 
     * @returns {undefined}
     */
    Import.prototype.resetMeta = function () {
        Object.keys(this.metaDataFields).forEach(function (fieldName) {
           if (this.metaDataFields[fieldName] !== null) {
               this.metaDataFields[fieldName].value = '';
           } 
        }, this);
    };
    
    /**
     * Stores and loads the Modifiers, then sets up the Custom Styles if
     * any were contained in the themes _extra object.
     * 
     * @param {object} modifiers The modifiers to process.
     * 
     * @returns {undefined}
     */
    Import.prototype.handleThemeImport = function (modifiers) {
        var extra = {};
        
        this.editor.refreshMonitor.disabled = true;
        
        if (modifiers.hasOwnProperty('vars')) {
            this.editor.modifiers = modifiers;
        } else {
            // WARNING: In around 1.2.0 THIS WILL BE DEPRECATED
            // we will be switching to storing modifiers under the
            // vars property

            // Store the Modifiers
            this.editor.modifiers.vars = modifiers;
            
            if (modifiers.hasOwnProperty('_extra')) {
                this.editor.modifiers._extra = JSON.parse(JSON.stringify(modifiers._extra));
            }
        }

        // Now load the modifiers into each component
        this.loadComponentModifiers(this.editor.modifiers.vars);

        this.editor.refreshMonitor.disabled = false;

        // If the JSON has an _extra field
        if (modifiers.hasOwnProperty('_extra')) {
            // Clone the Extra's Object, or after applying the
            // custom less, the custom css disappears
            extra = JSON.parse(JSON.stringify(modifiers._extra));

            this.importThemeExtra(extra);
        }

        this.editor.applyModifications(this.editor.modifiers, true);
    };
    
    /**
     * Handles importing the Theme Extra.
     * 
     * @param {Object} extra The Theme extra object.
     * 
     * @returns {undefined}
     */
    Import.prototype.importThemeExtra = function (extra) {
        var lessStyles = [];
        
        if (extra.hasOwnProperty('meta')) {
            Object.keys(extra.meta).forEach(function (fieldName) {
                if (this.metaDataFields.hasOwnProperty(fieldName)) {
                    if (this.metaDataFields !== null) {
                        this.metaDataFields[fieldName].value = extra.meta[fieldName];
                    }
                }
            }, this);
        }

        // If there is Custom Less
        if (extra.hasOwnProperty('less')) {
            extra.less.forEach(function (lessText) {
                lessStyles.push(this.addCustomStyles(lessText, 'Less'));
            }, this);

            // Apply the less modifications now before it gets prefixed and wont apply correctly
            this.editor.applyModifications(null, true);

            lessStyles.forEach(function (style) {
               // Now the Less should be compiled to CSS, so we can attempt
               // to prefix the CSS
               style.innerHTML = this.processor.prefixCustomStyles(style.innerHTML, 'Less');
            }, this.editor);
        }

        // If there is Custom Css
        if (extra.hasOwnProperty('css')) {
            extra.css.forEach(function (cssText) {
                this.addCustomStyles(cssText, 'Css');
            }, this);
        }
    };