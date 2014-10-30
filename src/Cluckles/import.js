    /**
     * Manages the Importing of Theme files (Json) and loading the modifiers into all of
     * the editor components.
     * 
     * @class Import
     * 
     * Import Options:
     * - src: {string} The src path to the Theme file to load and parse.
     * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {object} options Import options.
     * 
     * @returns {Import}
     */
    var Import = function (editor, options) {
        this.editor             = editor;
        this.options            = options;
        this.themeModifiers     = {};

        // Main Less stylesheet and the Less folder Path
        this.mainStylesheet         = document.querySelector('link[rel="stylesheet/less"]');
        this.lessPath               = this.mainStylesheet.getAttribute('href').split('/').slice(0, -1).join('/') + '/';

        // Import Headers to allow the Custom Less to be able to reference,
        // variables and mixins
        this.customStylesHeader = '@import "' + this.lessPath + 'variables-custom.less";\n' + '@import "' + this.lessPath + 'mixins.less";\n';

        // Custom Styles textarea template and Custom styles panel (where the textareas will reside)
        this.customStylesTemplate   = null;
        this.customStylesPanel      = document.getElementById('customPanel');

        // Custom Styles
        this.customCss              = [];
        this.customLess             = [];

        if (options !== undefined) {
            // If the theme.src option was provided
            if (options.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.src);
            }
        }
        
        this.setupCustomStyles(); // Setup the ability to handle Custom Css/Less
        this.setupFileImport();   // Setup the File input so themes can be imported
    };

    /**
     * Parses a theme.json file located at the themeURL, by default uses "GET" as the method.
     * 
     * @param {string} themeUrl The url to locate the theme.json file and download the content.
     * 
     * @returns {undefined}
     */
    Import.prototype.parseThemeFile = function (themeUrl) {
        var themeXHR;

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
     * Binds the Events to Setup a File import, to import theme modifications from a
     * json file. Will only bind to file inputs, and import json files.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupFileImport = function () {
        var importInput = document.querySelector('*[data-cluckles-options="import"]');
        
        // If we can find an <input type="file" />
        if (importInput && importInput.type === 'file') {
            // Bind the change event so we know when a file was selected
            importInput.addEventListener('change', function (e) {
                var file = e.target.files[0],
                    reader = new FileReader();

                // If no file was chosen, dont try to read undefined,
                // or a json file was not selected
                if (!file || file.type !== 'application/json') {
                    alert('Please Select a JSON file (like one exported from Cluckles)');
                    return;
                }

                // Setup the File reader, so it will import the json file's modifiers
                reader.onload = function (evt) {
                    try {
                        var modifiers = JSON.parse(evt.target.result);

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
        var addCustomLessButton = document.querySelector('*[data-cluckles="add-custom-less"]'),
            addCustomCssButton  = document.querySelector('*[data-cluckles="add-custom-css"]'),
            template            = document.createElement('textarea');

        // Setup the Attribute of the text area
        template.setAttribute('rows', 5);
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
        console.log(styles, type);
        var textArea    = this.customStylesTemplate.cloneNode(false),
            customStyle = document.createElement('style'),
            // Were either adding/editing Less or Css
            styleArray  = this['custom' + type], // Array which stores styles of this Type
            styleId     = styleArray.length; // Store the index of the style

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
            // Set the text of the textarea (will be set when importing)
            textArea.value = styles;

            // If we are adding/editing less
            if (type === 'Less') {
                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader.concat(styles);
            } else {
                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.prefixCustomStyles(styles, type);
            }

            // Store the styling so it can be edited later/exported
            styleArray[styleId] = styles;
        } else {
            styleArray[styleId] = '';
        }

        // Add the Textarea to the Custom Styles Panel
        this.customStylesPanel.appendChild(textArea);
        // Add the Style tag (which passes the CSS/Less to less) after the main stylesheet in the head
        this.mainStylesheet.parentNode.insertBefore(customStyle, this.mainStylesheet.nextSibling);

        // Setup the Change event to update the Style when the textarea changes (and recompile)
        textArea.addEventListener('change', function (e) {
            if (type === 'Less') {
                // Set the Type to 'text/less' so less will recompile it
                customStyle.setAttribute('type', 'text/less');

                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader.concat(e.target.value);
            } else {
                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.prefixCustomStyles(e.target.value, type);
            }

            // Update the Stored styling
            styleArray[styleId] = e.target.value;

            // Apply the modifications, and dont use cached styles, this will
            // make sure that it will parse the styling if the type is less
            this.editor.applyModifications(null, true);

            if (type === 'Less') {
                // Now that the less should have been compiled, it will be CSS,
                // so we can prefix it now
                customStyle.innerHTML = this.editor.prefixCustomStyles(customStyle.innerHTML, type);
            }
        }.bind(this));

        // Return the CustomStyle, so we can call the prefixCustomStyles method
        // once applyModifcations has been called (will be performed is type is less)
        return customStyle;
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
        var extra = {},
            lessStyles = [];

        // Store the Modifiers
        this.editor.modifiers = modifiers;

        // Now load the modifiers into each component
        this.loadComponentModifiers(this.modifiers);

        // If the JSON has an _extra field
        if (modifiers.hasOwnProperty('_extra')) {
            // Clone the Extra's Object, or after applying the
            // custom less, the custom css disappears
            extra = JSON.parse(JSON.stringify(modifiers._extra));

            // If there is Custom Less
            if (extra.hasOwnProperty('less')) {
                extra.less.forEach(function (lessText) {
                    lessStyles.push(this.addCustomStyles(lessText, 'Less'));
                }, this);

                // Apply the modifications, and dont use cached styles
                // Should recompile everything, this forces Less to compile
                // the Custom Less
                this.editor.applyModifications(null, true);
                
                lessStyles.forEach(function (style) {
                   // Now the Less should be compiled to CSS, so we can attempt
                   // to prefix the CSS
                   style.innerHTML = this.prefixCustomStyles(style.innerHTML, 'Less');
                }, this.editor);
            }

            // If there is Custom Css
            if (extra.hasOwnProperty('css')) {
                extra.css.forEach(function (cssText) {
                    this.addCustomStyles(cssText, 'Css');
                }, this);

                // Apply the modifications, should append the Custom Css to
                // the Currently compiled Css
                this.editor.applyModifications();
            }
        } else {
            this.editor.applyModifications();
        }
    };