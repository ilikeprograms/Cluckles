/* global Export, Jumbotron, GrayScale, BrandModifier, Navbar, FormState, ListGroup, Dropdown, Misc, PanelBase, NavbarBase, Breadcrumb */
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
     * @property {Export} export Manages the Theme exporting.
     * @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
     * @property {Breadcrumbs} breadcrumbs Holds modifications to the Breadcrumbs component.
     * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
     * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
     * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
     * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
     * @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
     * @property {Navbar} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
     * @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
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
        this.refreshMonitor     = {
            readyState: 0,
            delay: options.refreshDelay || 750
        };
        
        // Export
        this.export             = new Export(this, options.export);

        this.misc               = new Misc(this);
        // Component vars
        this.breadcrumbs        = new Breadcrumb(this);
        this.dropdown           = new Dropdown(this);
        this.jumbotron          = new Jumbotron(this);
        this.grayScale          = new GrayScale(this);
        this.branding           = new BrandModifier(this);
        this.panelBase          = new PanelBase(this);
        this.navbarBase         = new NavbarBase(this);
        this.navbar = {
            'default':            new Navbar(this),
            'inverse':            new Navbar(this, 'inverse')
        };
        this.formStates = {
            'default':            new FormState(this, 'default'),
            'primary':            new FormState(this, 'primary'),
            'success':            new FormState(this, 'success'),
            'info':               new FormState(this, 'info'),
            'warning':            new FormState(this, 'warning'),
            'danger':             new FormState(this, 'danger')
        };
        this.listGroup          = new ListGroup(this);

        // All modifier vars
        this.modifiers = {};

        // If the theme option was provided
        if (options.hasOwnProperty('theme')) {

            // If the theme.src option was provided
            if (options.theme.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.theme.src);
            }
        }

        // Configure the Post Processor for when Less finished Processing Changes to the Theme
        this.setupPostProcessor(this.lessGlobal);
    };
    
    /**
     * Sets up a Callback for the Less#postProcessor callback.
     * 
     * @param {Object} less The Global less object.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setupPostProcessor = function (less) {
        // Provide less with the postProcessor callback we want to executre
        less.postProcessor = function (css) {
            // Generate a Download blob from the Compiled CSS
            this.export.generateCssBlob(css);
        }.bind(this);
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
        // Itterate over the object to extract modifications for both styles of Navbar's
        Object.keys(navbar).forEach(function (style) {
            var navbarStyle = navbar[style];

            this.extractModifications(modifiers, navbarStyle);
        }, this);

        // FormStates
        // Itterate over the object to extract modifications for each styles of FormState's
        Object.keys(formStates).forEach(function (style) {
            var formStatesStyle = formStates[style];

            this.extractModifications(modifiers, formStatesStyle);
        }, this);
        
        // Panel Base
        this.extractModifications(modifiers, this.panelBase);

        // Navbar Base
        this.extractModifications(modifiers, this.navbarBase);

        // Misc
        this.extractModifications(modifiers, this.misc);

        // Branding
        this.extractModifications(modifiers, this.branding);

        // Breadcrumbs
        this.extractModifications(modifiers, this.breadcrumbs);

        // Dropdown
        this.extractModifications(modifiers, this.dropdown);

        // Jumbotron
        this.extractModifications(modifiers, this.jumbotron);

        // List Group
        this.extractModifications(modifiers, this.listGroup);

        return modifiers;
    };

    /**
     * Extracts the Modifications for the particular style/component by using
     * ThemeModifier.prototype.getModifications() and adds them to ThemeEditor.modifications.
     * 
     * @param {Object} modifiers All of the modifications to the theme.
     * @param {Obejct} modifiersType The object which holds the modifications for a particular style/components.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.extractModifications = function (modifiers, modifiersType) {
        var modifiersOfType = modifiersType.getModifications();
        Object.keys(modifiersOfType).forEach(function (modifier) {
            var modifierObject = modifiersOfType[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });
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
     * Applies the modification, or makes the refreshMonitor queue a single update
     * in x milliseconds from now, controlled by this.refreshMonitor.delay.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.queueModifications = function () {
        // If an update is allowed right now, apply the modifications
        if (this.refreshMonitor.readyState === 0) {
            this.applyModifications();
            
            // Set the state to not ready for more updates yet
            this.refreshMonitor.readyState = 1;
            
            // Set a timeout to allow updated again after x time (refreshMonitor.rate)
            // and apply the modifications that were pending
            setTimeout(function () {
                this.refreshMonitor.readyState = 0;
                this.applyModifications();
            }.bind(this), this.refreshMonitor.delay);
        }
    };
    
    /**
     * Applies the Modifications to the Less Theme.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.applyModifications = function () {
        this.export.generateJsonBlob();
        this.lessGlobal.modifyVars(this.getModifiers());
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
                this.queueModifications();
            }
        }.bind(this);

        themeXHR.send(null);
    };

    window.ThemeEditor = ThemeEditor;
})(window);