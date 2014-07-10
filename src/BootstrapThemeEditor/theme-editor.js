/* global Jumbotron, GrayScale, BrandModifier, Navbar, FormState, ListGroup, Dropdown */
(function (window) {
    "use strict";

    /**
     * ThemeEditor class holds the modifications to the less theme using sub classes
     * which hold information about the modifications, for each different part of the theme.
     * Such as branding, base colors, navbar, etc etc. These modifications can then be
     * retrieved or applied to the current page.
     * 
     * @class ThemeEditor
     * 
     * Generic Options:
     * - delay: {Number} Milliseconds delay between refresh updates (Default: 750)
     * 
     * @param {Object} less The Global less object.
     * 
     * @property {Object} lessGlobal The Global less object.
     * @property {string} componentBaseBg The base background color of bootstrap components.
     * @property {string} wellBg The well components background color.
     * @property {string} bodyBg The body background color.
     * @property {string} textColor The body text color.
     * @property {string} headingsColor The headings color.
     * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
     * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
     * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
     * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
     * @property {Object} navbar Holds Navbar instances which control the styling of Navbar components.
     * @property {Object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
     * @property {ListGroup} listGroup Holds the changes to the ListGroup component.
     * @property {object} modifiers Holds all of the Modifications to the whole theme.
     * 
     * @returns {ThemeEditor}
     */
    var ThemeEditor = function (less, options) {
        this.lessGlobal         = less;
        this.options            = options;
        
        /**
         * Monitors the refreshing of the less files, enables it to be block for x duration between refreshes. To avoid crashing the brower :).
         * 
         * @property readyState {Number} Tracks whether or not another refresh can be performed. (0 = ready, 1 = on delaying).
         * @propery delay {Number} Milliseconds delay between refresh updates (Default: 750).
         */
        this.refreshMonitor      = {
            readyState: 0,
            delay: options.refreshDelay || 750
        };

        // Misc Theme vars
        this.componentBaseBg	= null;
        this.wellBg				= null;
        this.bodyBg				= null;
        this.textColor			= null;
        this.headingsColor		= null;

        // Component vars
        this.dropdown			= new Dropdown(this);
        this.jumbotron			= new Jumbotron(this);
        this.grayScale			= new GrayScale(this);
        this.branding			= new BrandModifier(this);
        this.navbar = {
            'default':			  new Navbar(this),
            'inverse':			  new Navbar(this, 'inverse')
        };
        this.formStates = {
            'default':			  new FormState(this, 'default'),
            'primary':			  new FormState(this, 'primary'),
            'success':			  new FormState(this, 'success'),
            'info':				  new FormState(this, 'info'),
            'warning':			  new FormState(this, 'warning'),
            'danger':			  new FormState(this, 'danger')
        };
        this.listGroup			= new ListGroup(this);

        // All modifier vars
        this.modifiers = {};

        // If the download option was provided
        if (options.hasOwnProperty('download')) {

            // If the download.append option was provided
            if (options.download.hasOwnProperty('append')) {
                // Attempt to append to the element selector in append
                this.downloadLink = this.createDownloadLink(options.download.append);
            } else {
                this.downloadLink = this.createDownloadLink();
            }
        }

        // If the Save option was provided
        if (options.hasOwnProperty('save')) {
            
            // If the save.append option was provided
            if (options.save.hasOwnProperty('append')) {
                // Attempt to append to the element selector in append
                this.createSaveLink(options.save.append);
            } else {
                this.createSaveLink();
            }
        }

        // If the theme option was provided
        if (options.hasOwnProperty('theme')) {

            // If the theme.src option was provided
            if (options.theme.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.theme.src);
            }
        }
    };

    /**
     * Sets the background color of Components, such as Panel body, List Groups.
     * 
     * @param {string} bg The background color to set.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setComponentBaseBackground = function (bg) {
        this.componentBaseBg = bg;
        this.applyModifications();
    };

    /**
     * Sets the Background color of the Well Component.
     * 
     * @param {string} bg The Background color to set.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setWellBackground = function (bg) {
        this.wellBg = bg;
        this.applyModifications();
    };

    /**
     * Sets the body background color.
     * 
     * @param {string} bg The body background color to set.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setBodyBackground = function (bg) {
        this.bodyBg = bg;
        this.applyModifications();
    };

    /**
     * Sets the body text color.
     * 
     * @param {string} color The body text color to set.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setTextColor = function (color) {
        this.textColor = color;
        this.applyModifications();
    };

    /**
     * Sets the headings text color.
     * 
     * @param {string} color The headings text color to set.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setHeadingsColor = function (color) {
        this.headingsColor = color;
        this.applyModifications();
    };

    /**
     * Get the Modifications which have been stored.
     * 
     * @returns {Object}
     */
    ThemeEditor.prototype.getModifiers = function () {
        var grayScale   = this.grayScale,
            navbar      = this.navbar,
            formStates  = this.formStates,
            modifiers   = this.modifiers;

        // Gray Base
        Object.keys(grayScale).forEach(function (style) {
            if (grayScale[style].color !== null) {
                if (style === 'gray') {
                    modifiers['@gray'] = grayScale[style].color;
                } else {
                    modifiers['@gray-' + style] = grayScale[style].color;
                }
            }
        });

        // Navbars
        Object.keys(navbar).forEach(function (style) {
            var navbarStyle = navbar[style],
                navbarModifications = navbarStyle.getModifications();

            Object.keys(navbarModifications).forEach(function (modifier) {
                var modifierObject = navbarModifications[modifier];
                modifiers[modifierObject.variable] = modifierObject.value;
            });
        });

        // FormStates
        Object.keys(formStates).forEach(function (stateType) {
            var formState = formStates[stateType],
                formModifications = formState.getModifications();

            Object.keys(formModifications).forEach(function (modifier) {
                var modifierObject = formModifications[modifier];
                modifiers[modifierObject.variable] = modifierObject.value;
            });
        });

        // Misc

        if (this.componentBaseBg !== null) { modifiers['@state-base-bg'] = this.componentBaseBg; }
        if (this.wellBg !== null) { modifiers['@well-base-bg'] = this.wellBg; }
        if (this.bodyBg !== null) { modifiers['@body-bg'] = this.bodyBg; }
        if (this.textColor !== null) { modifiers['@text-color'] = this.textColor; }
        if (this.headingsColor !== null) { modifiers['@headings-color'] = this.headingsColor; }

        // Branding
        var brandingModifiers = this.branding.getModifications();
        Object.keys(brandingModifiers).forEach(function (modifier) {
            var modifierObject = brandingModifiers[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });

        // Dropdown

        var dropdownModifiers = this.dropdown.getModifications();
        Object.keys(dropdownModifiers).forEach(function (modifier) {
            var modifierObject = dropdownModifiers[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });

        // Jumbotron

        var jumbotronModifiers = this.jumbotron.getModifications();
        Object.keys(jumbotronModifiers).forEach(function (modifier) {
            var modifierObject = jumbotronModifiers[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });

        // List Group

        var listGroupModifiers = this.listGroup.getModifications();
        Object.keys(listGroupModifiers).forEach(function (modifier) {
            var modifierObject = listGroupModifiers[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });

        return modifiers;
    };

    /**
     * Turns the Modifications to the Theme into JSON.
     * 
     * @returns {String}
     */
    ThemeEditor.prototype.getJSON = function () {
        return JSON.stringify(this.getModifiers());
    };

    /**
     * Applies the Modifications to the Less Theme.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.applyModifications = function () {
        this.generateDownloadBlob();
        this.lessGlobal.modifyVars(this.getModifiers());
    };

    /**
     * Sends the Theme Data to the URL provided by the "save" option to ThemeEditor(options).
     * 
     * Save options:
     * - method:    {string}    The HTTP method for the save request. Default "POST".
     * - url:       {string}    The URL to send the JSON data.
     * - callback:  {Function}  A callback function to execute on success.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.sendThemeData = function () {
        var options = this.options.save,
            method = options.method || 'POST', // Default to "POST"
            saveXHR;

        // Throw an error if the URL option was not provided or was not a string
        if (typeof options.url !== 'string') {
            throw new TypeError('ThemeEditor.sendThemeData: The save url was not provided, or was not a string');
        }

        // Create an XMLHttpRequest to send the Theme json to the server
        saveXHR = new XMLHttpRequest();
        saveXHR.open(method.toUpperCase(), options.url, true); // Open the URL, call uppercase on 
        saveXHR.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // Set the Content-Type header to JSON.

        // If a callback function is provided
        if (options.hasOwnProperty('callback')) {
            if (typeof options.callback === 'function') {
                // Wait for the XHR to finish (4) and be succesfull (200)
                saveXHR.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        // Call the callback function
                        options.callback();
                    }
                };
            }
        }

        // Send the JSON to the server
        saveXHR.send(this.getJSON());
    };

    /**
     * Prases a theme.json file located at the themeURL, by default uses "GET" as the method.
     * 
     * @param {string} themeUrl The url to locate the theme.json file and download the content.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.parseThemeFile = function (themeUrl) {
        var themeXHR;

        // If an url to the theme.json file was not provided, or was not a string
        if (typeof themeUrl !== 'string') {
            throw new TypeError('ThemeEditor.parseThemeFile: The theme file options provided is not a string');
        }

        // Create a new XMLHttpRequest to fetch the theme.json file data
        themeXHR = new XMLHttpRequest();
        themeXHR.overrideMimeType('application/json'); // Make sure were expecting JSON data
        themeXHR.open('GET', themeUrl, true);

        // When the File has loaded succesfully
        themeXHR.onreadystatechange = function () {
            if (themeXHR.readyState === 4 && themeXHR.status === 200) {
                // Parse the json and store it in this.modifiers
                this.modifiers = JSON.parse(themeXHR.responseText);

                // Now apply the modifications to style the page with the theme.json
                this.applyModifications();
            }
        }.bind(this);

        themeXHR.send(null);
    };

    /**
     * Creates and returns a Primary Bootstrap Anchor tag link.
     * 
     * @returns {Element}
     */
    ThemeEditor.prototype.createBsButton = function () {
        var button = document.createElement('a'); // Create link

        // Add Primary BS classes
        button.classList.add('btn');
        button.classList.add('btn-primary');

        return button;
    };

    /**
     * Creates a Save button and appends it to the element provided by the destination.
     * 
     * Save Options:
     * - id:    {string} The id to set for the save button (Default "save_theme_link").
     * - text:  {string} The text content of the button (Default "Save Theme").
     * 
     * @param {string} destination The destination element selector (Default "body").
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.createSaveLink = function (destination) {
        var saveOptions = this.options.save,
            saveLink = this.createBsButton(), // Create a button
            dest = destination === undefined ? 'body' : destination; // Body or custom parent

        // Set the text and id of the Save button
        saveLink.textContent = saveOptions.text || 'Save Theme';
        saveLink.setAttribute('id', saveOptions.id || 'save_theme_link');

        // Append the Save button to the document
        document.querySelector(dest).appendChild(saveLink);

        // Add a click handler which calls the sendThemeData function
        saveLink.addEventListener('click', this.sendThemeData.bind(this), false);

        return saveLink;
    };

    /**
     * Creates a Download button and appends it to the element provided by the destination.
     * 
     * Download Options:
     * - id:    {string} The id to set for the download button (Default "download_theme_link").
     * - text:  {string} The text content of the button (Default "Download Theme").
     * 
     * @param {string} destination The destination element selector (Default "body").
     * 
     * @returns {Element}
     */
    ThemeEditor.prototype.createDownloadLink = function (destination) {
        var downloadOptions = this.options.download,
            downloadLink = this.createBsButton(),
            dest = destination === undefined ? 'body' : destination;

        // Set the text, id and download attrubute of the Download button
        downloadLink.textContent = downloadOptions.text || 'Download Theme';
        downloadLink.setAttribute('id', downloadOptions.id || 'download_theme_link');

        // Download attribute allows the button to provided a file to download on click
        // The generateDownloadBlob function provides the file contents
        downloadLink.setAttribute('download', 'theme.json');

        // Append the Download button to the document
        document.querySelector(dest).appendChild(downloadLink);

        return downloadLink;
    };

    /**
     * Generates a download blob and sets the content to the theme JSON modifications,
     * updated the download link with the download blob.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.generateDownloadBlob = function () {
        var blobData = this.getJSON(),
            blob = new Blob([blobData]), // Create a Blog with the JSON data
    
            // Create an Object url, allows the Blob data to be downloaded on click
            downloadBlob = window.URL.createObjectURL(blob);

        // Update the href of the download link, this now points to the blob data
        this.downloadLink.setAttribute('href', downloadBlob);
    };

    window.ThemeEditor = ThemeEditor;
})(window);