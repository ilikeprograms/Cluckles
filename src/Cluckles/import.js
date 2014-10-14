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
        this.editor         = editor;
        this.options        = options;
        this.themeModifiers = {};

        if (options !== undefined) {
            // If the theme.src option was provided
            if (options.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.src);
            }
        }
        
        this.setupFileImport();
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

                // Update the editor with the modifiers
                this.editor.modifiers = this.themeModifiers;

                // Now load the modifiers into each component
                this.loadComponentModifiers(this.themeModifiers);
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
                        // Parse the modifiers and load them into the components
                        var modifiers = JSON.parse(evt.target.result);
                        this.loadComponentModifiers(modifiers);

                        // Reset the file input
                        importInput.value = '';
                    } catch (e) {
                        // Catch invalid JSON errors
                        throw Error('ClucklesEditor.import.setupImport: Could not parse imported File');
                    }
                }.bind(this);

                // Attempt to read the file's text contents
                reader.readAsText(file);
            }.bind(this), false);
        }
    };